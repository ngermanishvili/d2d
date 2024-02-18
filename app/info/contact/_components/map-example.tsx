"use client"

import React from "react";

function MapExample() {
    return (
        <div className="relative w-full rounded h-600-px">
            <iframe
                title="Google Map"
                className="rounded-md h-[400px] w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.849574094608!2d-73.98663698459852!3d40.74881707932878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f55f3ad71%3A0xecd42ce8d62dcf90!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1645310686490!5m2!1sen!2sus"
                loading="lazy"
            ></iframe>
        </div>
    );
}

export default MapExample;
