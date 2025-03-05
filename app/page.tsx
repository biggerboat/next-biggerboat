"use client"

import Boat from './components/Boat'
import Wave from './components/Wave'
import Image from 'next/image'
import Lighthouse from './components/Lighthouse'
import FishContainer from './components/FishContainer'
import Button from './components/Button'
import BoatieList from './components/BoatieList'

export default function Home() {
  return (
    <main>
      <header className="relative">
        <Image 
          src="/logo.png" 
          alt="Biggerboat" 
          width={279} 
          height={107} 
          className="absolute left-10 top-12" 
          priority
        />
        <Lighthouse className="absolute right-0 top-0 hidden lg:block" />
        <div className="w-[300px] prose leading-tight absolute left-10 md:left-auto md:right-[150px] md:top-[300px] top-[200px]">
          <h1 className="sr-only">Biggerboat - Independent developers</h1>
          <p>We are a group of independent web developers, software engineers, technical consultants, creative coders, enthousiasts, individuals, friends and we are good company.</p>
          <p><strong>You have the need for a bigger boat?</strong></p>
          <p>We&apos;re just a call away.</p>
          <Button url="/contact" label="Contact us" />
        </div>
        <div className="relative h-[700px] animate-float pointer-events-none">
          <Wave position="back" className="bottom-5" />
          <Boat className="absolute bottom-[-15px] left-0 right-0 mx-auto" />
          <Wave position="front" className="bottom-0" />
        </div>
      </header>

      <section className="w-full -mt-4 pt-4 bg-[url('/background-water.png')]">
        <div className="text-right w-full max-w-3xl mx-auto my-12">
          <Image 
            src="/the-crew.png" 
            alt="The Crew" 
            width={261} 
            height={48} 
            className="inline-block mr-4" 
          />
        </div>
        <FishContainer />
        <BoatieList />
       
        <Image src="/plant.png" alt="Water plant decoration" width={60} height={190} className="ml-64" />
      </section>
    </main>
  );
}
