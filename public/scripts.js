// Show registration form
function showRegisterForm() {
    document.getElementById('register-form').style.display = 'block';
  }
  
  // Show login form
  function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
  }
  
  // Close form
  function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
  }
  
  // Handle registration
  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('Registration successful');
      closeForm('register-form');
    } else {
      alert(data.msg);
    }
  });
  
  // Handle login
  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('Login successful');
      closeForm('login-form');
    } else {
      alert(data.msg);
    }
  });
  