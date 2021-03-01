import React from 'react';
import Hero from '../Home/Hero';
import './contactForm.css';
import { WebsiteName } from '../../App';

const ContactForm = () => {
    document.title = "Contact | " + WebsiteName;
    
    (() => {
        // get all data in form and return object
        const getFormData = form => {
            let elements = form.elements;
            let honeypot;

            let fields = Object.keys(elements).filter(k => {
                if (elements[k].name === "honeypot") {
                    honeypot = elements[k].value;
                    return false;
                }
                return true;
            }).map(k => {
                if (elements[k].name !== undefined) {
                    return elements[k].name;
                    // special case for Edge's html collection
                } else if (elements[k].length > 0) {
                    return elements[k].item(0).name;
                }
                return elements[k];
            }).filter((item, pos, self) => {
                return self.indexOf(item) === pos && item;
            });

            let formData = {};
            fields.forEach(name => {
                let element = elements[name];

                // singular form elements just have one value
                formData[name] = element.value;

                // when our element has multiple items, get their values
                if (element.length) {
                    let data = [];
                    for (let i = 0; i < element.length; i++) {
                        let item = element.item(i);
                        if (item.checked || item.selected) {
                            data.push(item.value);
                        }
                    }
                    formData[name] = data.join(', ');
                }
            });

            // add form-specific values into the data
            formData.formDataNameOrder = JSON.stringify(fields);
            formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
            formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

            return { data: formData, honeypot: honeypot };
        }

        const handleFormSubmit = e => {  // handles form submit without any jquery
            e.preventDefault();           // we are submitting via xhr below
            let form = e.target;
            let formData = getFormData(form);
            let data = formData.data;

            // If a honeypot field is filled, assume it was done so by a spam bot.
            if (formData.honeypot) {
                return false;
            }

            disableAllButtons(form);
            let url = form.action;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    form.reset();
                    let thankYouMessage = form.querySelector(".thankyou_message");
                    if (thankYouMessage) {
                        thankYouMessage.style.display = "block";
                    }
                }
            };
            // url encode form data for sending as post data
            let encoded = Object.keys(data).map(k => {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
        }

        const loaded = () => {
            // bind to the submit event of our form
            let forms = document.querySelectorAll("form.contactForm");//Get all the forms having class="contactForm" in the form tag
            for (let i = 0; i < forms.length; i++) {
                forms[i].addEventListener("submit", handleFormSubmit, false);
            }
        };
        document.addEventListener("DOMContentLoaded", loaded, false);

        const disableAllButtons = form => {
            let buttons = form.querySelectorAll("button");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }
    })();

    return (
        <>
            <Hero title="Contact" />
            <form action="https://script.google.com/macros/s/AKfycbxbH7xHNRP8HLv5iZe27wFYrObPmIpozkYqmXYDSabVopnuDMmC/exec" className="contactForm">
                <input type="text" className="input" name="name" id="name" placeholder="Full name" required />
                <input type="email" className="input" name="email" id="email" placeholder="Email address" required />
                <input type="text" className="input" name="subject" id="subject" placeholder="Subject" required />
                <textarea className="input" name="message" id="message" placeholder="Message" rows="5"></textarea>

                <div className="formGroup submit_btn">
                    <input type="submit" className="btn submitBtn" value="Send Message" />
                </div> {/* Form Group */}

                <div className="thankyou_message" style={{ color: "green", textAlign: "center", marginTop: "30px", gridColumnStart: 1, gridColumnEnd: -1, display: "none" }}>
                    <p>Thank you for your message, It has been sent.</p>
                </div>
            </form>
        </>
    );
};

export default ContactForm;