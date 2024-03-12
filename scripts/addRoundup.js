const contactList = document.getElementById('contact-list')

const participantHTML = (id) => `
<input class="form-input" type="text" id="participant-name-p${id}" name="participant-name-p${id}" placeholder="Participant's Name (what they see when we email them)">
<input class="form-input" type="text" id="participant-email-p${id}" name="participant-email-p${id}" placeholder="Participant's Email">
<button class="btn-delete bg-rd btn-hidden" onclick="participantDeleteBtn(${id})">Delete</button>
`

const blacklistItemHTML = (id) => `
<select class="form-select" name="blacklist-bi${id}" id="blacklist-bi${id}">
    <optgroup id="og${id}" label="Participants">
    </optgroup>
</select>
<button class="btn-delete bg-rd btn-hidden" onclick="blacklistItemDeleteBtn(${id})">Delete</button>
`

const blacklistHTML = (id) => `
Blacklist
<ul id="bl${id}" class="blacklist-list"></ul>
<button class="bg-gn btn-add-participant" type="button" onclick="addAnotherBlacklistItem(${id})">Add Another Participant</button>
<button class="bg-rd" type="button" onclick="blacklistDeleteBtn(${id})">Delete Blacklist</button>
`

let parNum = 1
let blItemNum = 1
let blkLstNum = 1
let participants = []

function addAnotherParticipant() {
    const participant = document.createElement('li')
    participant.id = 'p' + parNum
    
    participant.classList.add('contact-item')
    participant.innerHTML = participantHTML(parNum)

    const inputs = participant.querySelectorAll('.contact-item .form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            updateInputs()
        })
    })

    parNum++
    contactList.appendChild(participant)
}

function participantDeleteBtn(participantId) {
    const deleteBtn = document.getElementById(`p${participantId}`)
    console.log(deleteBtn)
    deleteBtn.remove()
    parNum--
    updateInputs()
}

function updateInputs() {
    updateParticipantsList()
    updateSelectLists()
}

function updateParticipantsList() {
    participants = []

    const contactItems = document.querySelectorAll('.contact-item')

    contactItems.forEach(item => {
        const id = item.id.slice(1)
        const name = document.getElementById(`participant-name-${item.id}`).value
        const email = document.getElementById(`participant-email-${item.id}`).value

        participants.push({ id, name, email })
    })
}

function updateSelectLists() {
    const selects = document.querySelectorAll('.form-select');

    selects.forEach(select => {
        const updateList = participants
        const optgroup = select.querySelector('optgroup')

        const updateListIds = new Set(updateList.map(par => par.id));

        const existingOptionIds = new Set(Array.from(select.options).map(option => option.value))

        for (let i = 0; i < select.options.length; i++) {
            let optId = select.options[i].value
            if (!updateListIds.has(optId)) {
                optgroup.removeChild(select.options[i])
                i--
                existingOptionIds.delete(optId)
            }
        }

        updateList.forEach(par => {
            if (!existingOptionIds.has(par.id)) {
                const option = document.createElement('option')
                option.value = par.id
                option.textContent = par.name

                optgroup.appendChild(option)
                existingOptionIds.add(par.id)
            }
        });
    });
}

function addAnotherBlacklistItem(blacklistId) {
    const blacklistItem = document.createElement('li')
    blacklistItem.id = 'bi' + blItemNum
    blacklistItem.classList.add('blacklist-item')
    blacklistItem.innerHTML = blacklistItemHTML(blItemNum)

    blItemNum++
    const blacklistUl = document.getElementById(`bl${blacklistId}`)
    blacklistUl.appendChild(blacklistItem)
    updateSelectLists()
}

function blacklistItemDeleteBtn(blacklistItemId) {
    const blacklistItemLi = document.getElementById(`bi${blacklistItemId}`)
    blacklistItemLi.remove()
}

function addAnotherBlacklist() {
    const blacklist = document.createElement('li')
    blacklist.id = 'b' + blkLstNum
    blacklist.classList.add('blacklist')
    blacklist.innerHTML = blacklistHTML(blkLstNum)

    const blacklistUl = document.getElementById('blacklists')
    blacklistUl.appendChild(blacklist)
    addAnotherBlacklistItem(blkLstNum)

    blkLstNum++
    updateSelectLists()
}

function blacklistDeleteBtn(blacklistId) {
    const blacklistLi = document.getElementById(`b${blacklistId}`)
    blacklistLi.remove()
}

function getAllBlacklists() {
    let blacklists = []
    const blacklistsUl = document.getElementById('blacklists')
    const blacklistLis = blacklistsUl.querySelectorAll('.blacklist-list')

    blacklistLis.forEach(blacklist => {
        let setList = new Set()
        const blacklistItems = blacklist.querySelectorAll('.blacklist-item')

        blacklistItems.forEach(item => {
            const id = item.querySelector('select').value
            if (id !== '0') {
                setList.add(id)
            }
        })
        if (setList.size !== 0) {
            const list = [...setList]
            blacklists.push(list)
        }
    })

    return blacklists
}

// validation on blur for inputs
//    --name at least 3 chars nothing but alphabet
//    --same email validation, need to move to utils

// validation on name
// validation on date, can't do past
// max limit on message 2000 characters

function sendTheInvites() {
    const roundupName = document.getElementById('roundup-name').value
    const blacklists = getAllBlacklists()
    const date = document.getElementById('roundup-date').value
    const message = document.getElementById('roundup-message').value

    const roundup = {
        "name": roundupName,
        "participants": participants,
        "blacklist": blacklists,
        "date": date,
        "message": message,
        "status": 0
    }

    // to send to api
    console.log(roundup)
}

function initialBlacklists() {
    const selects = document.querySelectorAll('.form-select')

    selects.forEach(select => {
        const optgroup = select.querySelector('optgroup')
        const defaultOption = document.createElement('option')
        defaultOption.textContent = 'Participants'
        defaultOption.value = 0 
        optgroup.appendChild(defaultOption)

        participants.push({ id:0, name:'Participants', email:'default@gmail.com' })
    })
}

function initRoundupPage() {
    addAnotherParticipant()
    addAnotherBlacklist()
    initialBlacklists()
}

initRoundupPage()