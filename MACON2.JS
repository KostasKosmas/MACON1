document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registrationButton').addEventListener('click', function () {
      goToRegistration();
    });

    document.getElementById('searchButton').addEventListener('click', function () {
      search();
    });

    document.getElementById('completeButton').addEventListener('click', function () {
      completeRegistration();
    });

    document.getElementById('returnButton1').addEventListener('click', function () {
      goToPage1();
    });

    document.getElementById('returnButton2').addEventListener('click', function () {
      goToPage1();
    });

    document.getElementById('clearCodeButton').addEventListener('click', function () {
      clearCode();
    });
  });

  // Simple data store object
  const dataStore = {};
  const codeLimit = 4; // Limit of codes for each ΦΑΤΝΩΜΑ

  function goToRegistration() {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';

    // Reset input fields
    document.getElementById('nameInput').value = '';
    document.getElementById('codeInput').value = '';
  }

  function goToSearch() {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page3').style.display = 'block';

    // Reset input fields
    document.getElementById('searchCodeInput').value = '';

    // Clear previous search result
    document.getElementById('searchResult').innerText = '';
  }

  function goToPage1() {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'none';
    document.getElementById('page1').style.display = 'block';
  }

  function completeRegistration() {
    const name = document.getElementById('nameInput').value;
    const code = document.getElementById('codeInput').value;

    // Check if both fields are filled before proceeding
    if (!name || !code) {
      alert('Both ΦΑΤΝΩΜΑ and CODE must be filled to complete registration.');
      return;
    }

    // Check code limit for each ΦΑΤΝΩΜΑ
    if (!dataStore[name]) {
      dataStore[name] = [];
    }

    // Check if the code is already associated with the ΦΑΤΝΩΜΑ
    if (dataStore[name].includes(code)) {
      alert(`Code ${code} already associated with ΦΑΤΝΩΜΑ ${name}.`);
      return;
    }

    if (dataStore[name].length >= codeLimit) {
      alert(`Cannot add more codes for ΦΑΤΝΩΜΑ ${name}. Limit reached.`);
      return;
    }

    // Store the relation between name and code in the data store
    dataStore[name].push(code);

    // Save data to local storage
    saveToLocalStorage(code, name);

    
    alert(`Registration complete:\nΦΑΤΝΩΜΑ: ${name}\nCODE: ${code}`);

    // Reset input fields
    document.getElementById('nameInput').value = '';
    document.getElementById('codeInput').value = '';

    goToPage1();
  }

  function search() {
    const searchCode = document.getElementById('searchCodeInput').value;

    // Check if the search code field is filled before proceeding
    if (!searchCode) {
      alert('Enter a CODE to perform the search.');
      return;
    }

    // Retrieve the name associated with the code from the data store
    const resultText = findNameByCode(searchCode);

    // Display the result in the searchResult div
    document.getElementById('searchResult').innerText = `Result for CODE ${searchCode}:\nΦΑΤΝΩΜΑ: ${resultText || 'Not found'}`;
  }

  function findNameByCode(searchCode) {
    for (const name in dataStore) {
      if (dataStore[name].includes(searchCode)) {
        return name;
      }
    }
    return null;
  }

  function clearCode() {
    const searchCode = document.getElementById('searchCodeInput').value;
    const name = findNameByCode(searchCode);

    // Check if the search code field is filled before proceeding
    if (!name || !searchCode) {
      alert('Enter a valid ΦΑΤΝΩΜΑ and CODE to clear.');
      return;
    }

    // Check if the specified code exists for the ΦΑΤΝΩΜΑ
    const codeIndex = dataStore[name].indexOf(searchCode);
    if (codeIndex !== -1) {
      // Remove the specified code from the ΦΑΤΝΩΜΑ
      dataStore[name].splice(codeIndex, 1);

      // For simplicity, let's just display an alert
      alert(`Code ${searchCode} cleared for ΦΑΤΝΩΜΑ: ${name}`);
    } else {
      alert(`Code ${searchCode} not found for ΦΑΤΝΩΜΑ: ${name}`);
    }

    // Allow a new code to be input for the ΦΑΤΝΩΜΑ
    if (dataStore[name].length < codeLimit) {
      document.getElementById('codeInput').value = '';
    }
  }

  // Define a function to save data to local storage
  function saveToLocalStorage(code, name) {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || {};
    registrations[code] = name;
    localStorage.setItem('registrations', JSON.stringify(registrations));
  }

  // Define a function to search data in local storage
  function searchInLocalStorage(searchCode) {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || {};
    const resultText = registrations[searchCode] || 'Not found';
    document.getElementById('searchResult').innerText = `Result for CODE ${searchCode}:\nΦΑΤΝΩΜΑ: ${resultText}`;
  }
