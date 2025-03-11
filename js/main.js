// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        burger.classList.toggle('toggle');
    });
    
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearErrors();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            if (name.value.trim() === '') {
                showError(name, 'nameError', 'Vui lòng nhập họ và tên của bạn');
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                showError(email, 'emailError', 'Vui lòng nhập địa chỉ email của bạn');
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                showError(email, 'emailError', 'Vui lòng nhập địa chỉ email hợp lệ');
                isValid = false;
            }
            
            if (subject.value.trim() === '') {
                showError(subject, 'subjectError', 'Vui lòng nhập tiêu đề tin nhắn');
                isValid = false;
            }
            
            if (message.value.trim() === '') {
                showError(message, 'messageError', 'Vui lòng nhập nội dung tin nhắn');
                isValid = false;
            }
            
            if (isValid) {
                simulateSendingEmail({
                    name: name.value.trim(),
                    email: email.value.trim(),
                    subject: subject.value.trim(),
                    message: message.value.trim()
                });
            }
        });
    }
    
    // Helper functions
    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        input.classList.add('error');
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
        
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }
    
    function simulateSendingEmail(formData) {
        contactForm.style.opacity = '0.5';
        contactForm.style.pointerEvents = 'none';
        
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Đang gửi...';
        
        setTimeout(function() {
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            contactForm.reset();
            submitButton.textContent = originalText;
            contactForm.style.opacity = '1';
            contactForm.style.pointerEvents = 'auto';
            
            console.log('Form data sent:', formData);
            
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    }
});
