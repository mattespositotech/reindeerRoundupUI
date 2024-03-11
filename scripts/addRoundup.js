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

let parNum = 1
let blItemNum = 1
let participants = []

function addAnotherParticipant() {
    const participant = document.createElement('li')
    participant.id = 'p' + parNum
    
    participant.classList.add('contact-item')
    participant.innerHTML = participantHTML(parNum)

    const inputs = participant.querySelectorAll('.contact-item .form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            updateParticipantsList()
            updateSelectLists()
        })
    })

    parNum++
    contactList.appendChild(participant)
}

function participantDeleteBtn(id) {
    const deleteBtn = document.getElementById(`p${id}`)
    // needs to remove from blacklists too
    console.log(deleteBtn)
    deleteBtn.remove()
    parNum--
}

function updateParticipantsList() {
    participants = []

    const contactItems = document.querySelectorAll('.contact-item')

    contactItems.forEach(item => {
        const id = item.id.slice(1) // remove the prefix
        const name = document.getElementById(`participant-name-${item.id}`).value
        const email = document.getElementById(`participant-email-${item.id}`).value

        participants.push({ id, name, email })
    })
}

function updateSelectLists() {
    const selects = document.querySelectorAll('.form-select');

    selects.forEach(select => {
        const updateList = participants
        console.log(updateList)
        const optgroup = select.querySelector('optgroup')

        const updateListIds = new Set(updateList.map(par => par.id));
        console.log(updateListIds)

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
                console.log(option)

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
    const blacklist = document.getElementById(`bl${blacklistId}`)
    blacklist.appendChild(blacklistItem)
    updateSelectLists()
}

function blacklistItemDeleteBtn(id) {
    const blacklistItemLi = document.getElementById(`bi${id}`)
    console.log(blacklistItemLi)
    blacklistItemLi.remove()
    blItemNum--
}

// validation on blur for inputs
//    --name at least 3 chars nothing but alphabet
//    --same email validation, need to move to utils
// blur on all inputs to update participant list
// blacklist calls that list to populate select
// add init which generates the html for all first occurances

// validation on name
// validation on date, can't do past
// max limit on message 2000 characters

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
    addAnotherBlacklistItem(1)
    initialBlacklists()
}

initRoundupPage()