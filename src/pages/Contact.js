import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import {useDocTitle} from '../components/CustomHook';
import axios from 'axios';
// import emailjs from 'emailjs-com';
import Notiflix from 'notiflix';
import emailjs from 'emailjs-com';

const Contact = () => {
    useDocTitle('CWA | Creative Wind Solutions - Send us a message')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([])

    const clearErrors = () => {
        setErrors([])
    }

    const clearInput = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setMessage('')
    }

    const sendEmail = (e) => {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = 'Loading...';
        // let fData = new FormData();
        // fData.append('first_name', firstName)
        // fData.append('last_name', lastName)
        // fData.append('email', email)
        // fData.append('phone_number', phone)
        // fData.append('message', message)

        const emailData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phone,
            message: message,
        };

        // Use EmailJS to send the email
        emailjs.send('service_68rvug8', 'template_j8iua08', emailData,  'VPSQLe7H-2t5aGBdD')
            .then((response) => {
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').innerHTML = 'Send Message';
                clearInput();
                Notiflix.Report.success(
                    'Success',
                    'Your message has been sent!',
                    'Okay'
                );
            })
            .catch((error) => {
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').innerHTML = 'Send Message';
                Notiflix.Report.failure(
                    'An error occurred',
                    'Please try again later.',
                    'Okay'
                );
            });

        // axios({
        //     method: "post",
        //     url: process.env.REACT_APP_CONTACT_API,
        //     data: fData,
        //     headers: {
        //         'Content-Type':  'multipart/form-data'
        //     }
        // })
        // .then(function (response) {
        //     document.getElementById('submitBtn').disabled = false;
        //     document.getElementById('submitBtn').innerHTML = 'send message';
        //     clearInput()
        //     //handle success
        //     Notiflix.Report.success(
        //         'Success',
        //         response.data.message,
        //         'Okay',
        //     );
        // })
        // .catch(function (error) {
        //     document.getElementById('submitBtn').disabled = false;
        //     document.getElementById('submitBtn').innerHTML = 'send message';
        //     //handle error
        //     const { response } = error;
        //     if(response.status === 500) {
        //         Notiflix.Report.failure(
        //             'An error occurred',
        //             response.data.message,
        //             'Okay',
        //         );
        //     }
        //     if(response.data.errors !== null) {
        //         setErrors(response.data.errors)
        //     }
        //
        // });
    }
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='contact' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24 ">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">

                <form onSubmit={sendEmail}>

                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Send us a message</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <div>
                                    <input
                                        name="first_name"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="First Name*"
                                        value={firstName}
                                        onChange={(e)=> setFirstName(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.first_name}</p>
                                    }
                                </div>

                                <div>
                                    <input
                                        name="last_name"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Last Name*"
                                        value={lastName}
                                        onChange={(e)=> setLastName(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.last_name}</p>
                                    }
                                </div>

                                <div>
                                    <input
                                        name="email"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="email"
                                        placeholder="Email*"
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.email}</p>
                                    }
                                </div>

                                <div>
                                    <input
                                        name="phone_number"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="number"
                                        placeholder="Phone*"
                                        value={phone}
                                        onChange={(e)=> setPhone(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.phone_number}</p>
                                    }
                                </div>
                        </div>
                        <div className="my-4">
                            <textarea
                                name="message"
                                placeholder="Message*"
                                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                value={message}
                                onChange={(e)=> setMessage(e.target.value)}
                                onKeyUp={clearErrors}
                            ></textarea>
                            {errors &&
                                <p className="text-red-500 text-sm">{errors.message}</p>
                            }
                        </div>
                        <div className="my-2 w-1/2 lg:w-2/4">
                            <button type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-blue-900 hover:bg-blue-600 text-gray-100 p-3 rounded-lg w-full
                                    focus:outline-none focus:shadow-outline">
                                Send Message
                            </button>
                        </div>
                </div>
                </form>
                        <div
                            className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-blue-900 rounded-2xl">
                            <div className="flex flex-col text-white">

                                <div className="flex my-4 w-2/3 lg:w-3/4">
                                    <div className="flex flex-col">
                                        <i className="fas fa-map-marker-alt pt-2 pr-2" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-2xl">Office Address</h2>
                                        <p className="text-gray-400">Lagos State</p>
                                    </div>
                                </div>

                    <div className="flex my-4 w-2/3 lg:w-1/2">
                        <div className="flex flex-col">
                        <i className="fas fa-phone-alt pt-2 pr-2" />
                        </div>

                        <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us</h2>
                        <p className="text-gray-400">Tel: +2349160477538</p>

                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail</h2>
                                <p className="text-gray-400">omarsunday0@gmail.com</p>
                            </div>

                        </div>
                    </div>

                    <div className="flex my-4 w-2/3 lg:w-1/2">
                        <a href="https://wa.me/+2348100349932" target="_blank" rel="noreferrer"
                           className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8  mx-1 text-center pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 className="fill-current font-black hover:animate-pulse">
                                <path
                                    d="M20.52 3.484A11.944 11.944 0 0 0 12.013 0C5.379 0 .036 5.343.036 11.964c0 2.111.553 4.176 1.607 5.993L0 24l6.208-1.624a11.91 11.91 0 0 0 5.805 1.476h.005c6.633 0 11.974-5.344 11.974-11.963a11.925 11.925 0 0 0-3.472-8.405zM12.01 21.89a9.89 9.89 0 0 1-5.05-1.378l-.362-.214-3.684.964.988-3.59-.234-.373a9.864 9.864 0 0 1-1.53-5.273c0-5.469 4.448-9.913 9.922-9.913a9.843 9.843 0 0 1 7.008 2.906 9.869 9.869 0 0 1 2.907 7.004c-.004 5.471-4.452 9.912-9.965 9.912zm5.463-7.38c-.298-.15-1.76-.867-2.033-.966-.271-.1-.469-.149-.666.15-.198.298-.767.966-.94 1.164-.173.2-.348.223-.647.074-.298-.15-1.26-.466-2.396-1.487-.885-.788-1.48-1.762-1.654-2.06-.173-.298-.018-.459.13-.608.133-.133.298-.348.447-.521.149-.173.198-.298.298-.497.1-.2.05-.373-.025-.521-.075-.15-.666-1.609-.914-2.204-.24-.578-.482-.5-.666-.51h-.567c-.198 0-.522.075-.796.373-.273.298-1.04 1.016-1.04 2.477 0 1.46 1.064 2.875 1.213 3.074.149.198 2.093 3.21 5.073 4.5.709.306 1.263.488 1.694.623.712.227 1.36.195 1.874.118.572-.085 1.76-.718 2.011-1.412.248-.694.248-1.29.173-1.412-.075-.123-.272-.198-.57-.348z"></path>
                            </svg>

                        </a>
                        <a href="https://www.linkedin.com/in/omatsola-eyeoyibo/" target="_blank" rel="noreferrer"
                           className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8  mx-1 text-center pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 className='fill-current font-black hover:animate-pulse'>
                                <circle cx="4.983" cy="5.009" r="2.188"></circle>
                                <path
                                    d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path>
                            </svg>
                        </a>
                    </div>
                            </div>
                        </div>
                </div>
            </div>
            <Footer/>
        </>


    )
}

export default Contact;
