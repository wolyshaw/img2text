const form = document.querySelector('.form')
const fileInput = document.querySelector('.fileInput')

fileInput.addEventListener('change', async evt => {
  const { files } = evt.target
  if (files.length) {
    const reader = await createFileReader(files[0])
    const image = await createImage(reader)
    const prviewContainer = document.querySelector('.prview')
    prviewContainer.append(image)
    prviewContainer.style.width = image.width + 'px'
    prviewContainer.style.height = image.height + 'px'
  }
})

form.addEventListener('submit', async evt => {
  evt.preventDefault()
  const { files } = fileInput
  if (files[0]) {
    const formatData = new FormData()
    formatData.append('images', files[0])
    const res = await fetch('/', {method: 'post', body: formatData}).then(r => r.json())
    setWords(res.data[0].words_result)
  }
})

const getWordsElement = word => {
  const { words: text, location } = word
  const ele = document.createElement('div')
  ele.style.position = 'absolute'
  ele.style.left = location.left + 'px'
  ele.style.top = location.top + 'px'
  ele.style.width = location.width + 'px'
  ele.style.height = location.height + 'px'
  ele.textContent = text
  ele.classList.add('word')
  return ele
}

const setWords = words => {
  const prview = document.querySelector('.prview')
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    prview.append(getWordsElement(word))
  }
  return words
}

const createFileReader = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader)
    }
    reader.onabort = () => {
      reject()
    }
    reader.readAsDataURL(file)
  })

const createImage = reader =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.src = reader.result
    image.onload = () => {
      resolve(image)
    }
    image.onabort = () => {
      reject()
    }
  })
