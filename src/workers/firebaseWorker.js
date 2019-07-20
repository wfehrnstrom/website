onmessage = async function(e){
  try {
    let {firebase, config} = e.data
    if(firebase.apps.length <= 0){
      firebase.initializeApp(config)
      // Cloud Firestore startup
      // settings prevents ominous built-in timestamps warning
      const settings = {timestampsInSnapshots: true}
      await firebase.firestore().settings(settings)
    }
    postMessage(firebase)
  }
}
