"use client"

import React from "react";

function MapExample() {
    return (
        <div className="relative w-full rounded h-600-px">
            <iframe
                title="Google Map"
                className="rounded-md h-[400px] w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1129.1900897502408!2d44.74981728859351!3d41.78417082946891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446d0069a3cccb%3A0xff6432330386c746!2z4YOc4YOY4YOc4YOdIOGDkOGDkeGDkOGDqOGDmOGDq-GDlC3hg53hg6Dhg5Hhg5Thg5rhg5jhg5Dhg5zhg5jhg6EgNzQ!5e0!3m2!1sen!2sge!4v1710510536741!5m2!1sen!2sge"
                loading="lazy"
            ></iframe>

        </div>
    );
}

export default MapExample;
