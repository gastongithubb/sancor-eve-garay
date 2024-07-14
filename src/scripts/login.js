async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Guardar información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirigir a la página principal
        window.location.href = data.redirectUrl;
      } else {
        // Mostrar mensaje de error
        alert(data.message);
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Ocurrió un error durante el inicio de sesión');
    }
  }
  
  // Agregar el manejador de eventos al formulario de inicio de sesión
  document.querySelector('#login-form').addEventListener('submit', handleLogin);