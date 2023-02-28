export default (() => {
  const privateMsg = `Hello, I'm message no. 1`

  // Public API
  return {
    message1() {
      return privateMsg
    },
    message2() {
      return `Hello, I'm message no. 2`
    },
    message3() {
      return `Hello, I'm message no. 3`
    },
    message4() {
      return `Hello, I'm message no. 4`
    },
    message5() {
      return `Hello, I'm message no. 5`
    },
  }
})()
