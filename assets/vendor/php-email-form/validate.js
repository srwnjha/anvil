// /**
// * PHP Email Form Validation - v3.9
// * URL: https://bootstrapmade.com/php-email-form/
// * Author: BootstrapMade.com
// */
// (function () {
//   "use strict";

//   let forms = document.querySelectorAll('.php-email-form');

//   forms.forEach( function(e) {
//     e.addEventListener('submit', function(event) {
//       event.preventDefault();

//       let thisForm = this;

//       let action = thisForm.getAttribute('action');
//       let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
//       if( ! action ) {
//         displayError(thisForm, 'The form action property is not set!');
//         return;
//       }
//       thisForm.querySelector('.loading').classList.add('d-block');
//       thisForm.querySelector('.error-message').classList.remove('d-block');
//       thisForm.querySelector('.sent-message').classList.remove('d-block');

//       let formData = new FormData( thisForm );

//       if ( recaptcha ) {
//         if(typeof grecaptcha !== "undefined" ) {
//           grecaptcha.ready(function() {
//             try {
//               grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
//               .then(token => {
//                 formData.set('recaptcha-response', token);
//                 php_email_form_submit(thisForm, action, formData);
//               })
//             } catch(error) {
//               displayError(thisForm, error);
//             }
//           });
//         } else {
//           displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
//         }
//       } else {
//         php_email_form_submit(thisForm, action, formData);
//       }
//     });
//   });

//   function php_email_form_submit(thisForm, action, formData) {
//     fetch(action, {
//       method: 'POST',
//       body: formData,
//       headers: {'X-Requested-With': 'XMLHttpRequest'}
//     })
//     .then(response => {
//       if( response.ok ) {
  
//         return response.json();
//       } else {
//         throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
//       }
//     })
//     .then(data => {
//     //   thisForm.querySelector('.loading').classList.remove('d-block');
//     //   if (data.trim() == 'OK') {
//     //     thisForm.querySelector('.sent-message').classList.add('d-block');
//     //     thisForm.reset(); 
//     //   } else {
//     //     throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
//     //   }
//     displayError(thisForm,data.message,data.success);
//     })
//     .catch((error) => {
//       displayError(thisForm, error);
//     });
//   }

//   function displayError(thisForm, error,success=false) {
//     console.log(success);
//       thisForm.querySelector('.loading').classList.remove('d-block');
//       thisForm.querySelector('.error-message').classList.add('d-block');
//       thisForm.querySelector('.error-message').innerHTML = error;
//       if(success){
//           thisForm.querySelector('.error-message').classList.add('successbg');
//           thisForm.querySelector('.error-message').classList.remove('errorbg');
//           thisForm.reset();
//         }else{
//           thisForm.querySelector('.error-message').classList.add('errorbg');
//           thisForm.querySelector('.error-message').classList.remove('successbg');

//       }
     
//   }

// })();
function sendMail(e) {
  e.preventDefault();  // Prevent form from refreshing the page
  let myMessage = document.querySelector(".my-message")
  let name = document.getElementById("name-field").value;
  let email = document.getElementById("email-field").value;
  let message = document.getElementById("message-field").value;
  let subjectField = document.getElementById("subject-field").value;

  // Check if all fields are filled
  if (name && email && message && subjectField) {
    var params = {
      from_name: name,
      email_id: email,
      subject: subjectField,
      message: message,
    };

    // Get the reCAPTCHA response
    const captchaResponse = grecaptcha.getResponse();
    
    if (captchaResponse) {
      // Send the email using emailjs
      emailjs.send("service_367wlkc", "template_pr93ahu", params)
      .then((res) => {
        myMessage.innerHTML = "Email sent success"
        myMessage.classList.add("successmessage")
        myMessage.classList.remove("errormessage")
        // document.getElementById("myForm").reset();
        document.getElementById("myForm").reset();
      })
      .catch((err) => {
        console.log(err);
        
   myMessage.innerHTML = "Failed to send email. Please try again."
   myMessage.classList.remove("successmessage")
   myMessage.classList.add("errormessage")
   
  });
} else {
  myMessage.innerHTML = "Please complete the reCAPTCHA."
  myMessage.classList.remove("successmessage")
  myMessage.classList.add("errormessage")
  
  
}
} else {
myMessage.innerHTML = "Please fill in all the fields."
myMessage.classList.remove("successmessage")
myMessage.classList.add("errormessage")
   
  }
}