import React from 'react'

const About = () => {
  return (
    <div>
      <div class="container mx-auto px-4 py-12 text-center">
        <h1 class="text-4xl font-bold text-blue-600 mb-4">Welcome to Gymezy</h1>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
            At <span class="font-semibold">Gymezy</span>, we are revolutionizing the fitness industry with cutting-edge
            <span class="text-blue-500">AI</span>, <span class="text-green-500">IoT</span>, and data-driven technology
            to create a seamless, efficient, and intelligent gym experience.
        </p>

        <div class="mt-8 bg-slate-300 dark:bg-slate-900 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
            <h2 class="text-2xl font-semibold text-blue-600">Intelligent Crowd Management</h2>
            <p class="text-gray-700 mt-4">
                Our Intelligent Crowd Management System ensures optimal equipment availability,
                real-time occupancy tracking, and automated scheduling, eliminating overcrowding and reducing wait times.
            </p>
        </div>

        <div class="mt-8 flex flex-col md:flex-row justify-center gap-6">
            <div class="bg-slate-300 dark:bg-slate-900 shadow-md rounded-lg p-6 max-w-sm text-center">
                <h3 class="text-xl font-semibold text-green-500">AI-Powered Analytics</h3>
                <p class="text-gray-700 mt-2">
                    With advanced sensors and AI-driven insights, we optimize gym flow for maximum efficiency.
                </p>
            </div>
            <div class="bg-slate-300 dark:bg-slate-900 shadow-md rounded-lg p-6 max-w-sm text-center">
                <h3 class="text-xl font-semibold text-purple-500">Cloud-Based Integration</h3>
                <p class="text-gray-700 mt-2">
                    Seamlessly manage data and access real-time updates anytime, anywhere.
                </p>
            </div>
        </div>

        <div class="mt-8 bg-blue-600 text-white py-6 px-4 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 class="text-2xl font-semibold">Join the Future of Smart Gyms</h2>
            <p class="mt-4">
                Whether you're a gym owner looking to optimize operations or a fitness enthusiast seeking a hassle-free
                workout experience, <span class="font-semibold">Gymezy</span> is the answer.
            </p>
        </div>
    </div>
    </div>
  )
}

export default About