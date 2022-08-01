import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_kuz1ymm', 'template_pf95btk', form.current, 'vrEPn-xWIBAgXNvbl')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div>
            <form class="contact1-form validate-form" id="contact-form" ref={form} onSubmit={sendEmail}>
                            <span class="contact1-form-title">
                                Get in touch
                            </span>
                            <input type="hidden" name="contact_number" />
            
                            <div class="wrap-input1 validate-input" data-validate = "Name is required">
                                <input id="name" class="input1" type="text" name="name" placeholder="Name" required/>
                                <span class="shadow-input1"></span>
                                <span class="name-error"></span>
                            </div>
            
                            <div class="wrap-input1 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input id="email" class="input1" type="text" name="email" placeholder="Email" required/>
                                <span class="shadow-input1"></span>
                                <span class="name-error"></span>
                            </div>

                            <div class="wrap-input1 validate-input" data-validate = "Message is required">
                                <textarea id="message" class="input1" name="message" placeholder="Message" required></textarea>
                                <span class="shadow-input1"></span>
                            </div>
            
                            <div class="container-contact1-form-btn">
                                <button class="contact1-form-btn" type="submit" value="Send Email" onclick="checkValidations()">
                                     <span>
                                        Send Email
                                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </span>
                                </button> 
                            </div>
                        </form>

        </div>

    );
};