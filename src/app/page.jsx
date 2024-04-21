"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <section className="py-4 container mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl font-bold">Welcome to AssuExpert</h1>
        <p className="mt-1">
          Your Gateway to Seamless Auto Insurance Claims Management
        </p>
        <Link
          href="/auth"
          className="bg-cyan-800 text-white text-3xl font-bold rounded-md px-8 py-4 w-64 my-8 transition-colors duration-300 ease-in-out hover:bg-cyan-900"
        >
          Get Started
        </Link>
        <div>
          <img src="/images/homepage title.jpg" alt="Hit Car" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto py-8 flex flex-col gap-8">
        <div className="flex gap-8">
          {/* About Us */}
          <section className="px-12 py-10 bg-white border-cyan-800 border-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700">
              At AssuExpert, we&apos;re dedicated to revolutionizing the way
              auto insurance claims are processed. With a deep understanding of
              the industry&apos;s challenges, we&apos;ve created a platform that
              fosters seamless collaboration between insurance companies and
              expert professionals.
            </p>
          </section>

          {/* Our Mission */}
          <section className="px-12 py-10 bg-white border-cyan-800 border-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to streamline the claims management process,
              empowering insurance providers with access to a network of skilled
              experts while ensuring swift and fair settlements for
              policyholders. We aim to be the catalyst for efficiency and
              accuracy in the auto insurance industry.
            </p>
          </section>
        </div>

        {/* How It Works */}
        <section className="px-12 py-10 bg-white border-cyan-800 border-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-700 mb-6">
            The process is simple and efficient:
          </p>
          <ol className="list-decimal list-inside grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <li className="flex flex-col items-center mb-2">
              <div className="text-3xl text-white font-bold rounded-full w-12 h-12 flex items-center justify-center bg-cyan-800 mb-2">
                1
              </div>
              <p className="text-gray-700">
                Insurance companies create a service order, including victim
                information, details of the at-fault party (if applicable), and
                all vehicle information. This service order is then sent to our
                platform.
              </p>
            </li>
            <li className="flex flex-col items-center mb-2">
              <div className="text-3xl text-white font-bold rounded-full w-12 h-12 flex items-center justify-center bg-cyan-800 mb-2">
                2
              </div>
              <p className="text-gray-700">
                Our system matches the service order with a suitable expert from
                our network. The expert receives the service order and begins
                the assessment process.
              </p>
            </li>
            <li className="flex flex-col items-center mb-2">
              <div className="text-3xl text-white font-bold rounded-full w-12 h-12 flex items-center justify-center bg-cyan-800 mb-2">
                3
              </div>
              <p className="text-gray-700">
                The expert meticulously evaluates the damage, noting the
                vehicle&apos;s condition before and after the incident. They
                include details about parts that need repair or replacement, as
                well as any other pertinent information.
              </p>
            </li>
            <li className="flex flex-col items-center mb-2">
              <div className="text-3xl text-white font-bold rounded-full w-12 h-12 flex items-center justify-center bg-cyan-800 mb-2">
                4
              </div>
              <p className="text-gray-700">
                Once the assessment is complete, the expert generates a
                comprehensive report and sends it back to the insurance company.
              </p>
            </li>
            <li className="flex flex-col items-center mb-2">
              <div className="text-3xl text-white font-bold rounded-full w-12 h-12 flex items-center justify-center bg-cyan-800 mb-2">
                5
              </div>
              <p className="text-gray-700">
                Both insurance companies and experts have access to previous
                service orders and reports for consultation and reference.
              </p>
            </li>
          </ol>
        </section>

        {/* Services */}
        <section className="px-12 py-10 bg-white border-cyan-800 border-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Services</h2>
          <ul className="flex gap-4">
            <li className="flex-1">
              <h3 className="text-xl font-bold mb-2">Service Automation</h3>
              <p className="text-gray-700">
                Our platform establishes a direct link between insurance
                companies and expert professionals, streamlining the process for
                efficient and seamless collaboration.
              </p>
            </li>
            <li className="flex-1">
              <h3 className="text-xl font-bold mb-2">Report Generation</h3>
              <p className="text-gray-700">
                We specialize in generating detailed reports that outline the
                extent of damage and recommended actions for insurance
                companies.
              </p>
            </li>
            <li className="flex-1">
              <h3 className="text-xl font-bold mb-2">Expert Consultation</h3>
              <p className="text-gray-700">
                Our professionals offer expert consultation services to
                insurance companies, guiding them through complex claims
                processes and providing valuable insights.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
