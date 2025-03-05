"use client"

import { useEffect, useState, useMemo } from "react"
import Boatie from "./Boatie"
import boatiesData from '@/data/boaties.json'

interface Person {
  name: string
  bio?: string
  skills?: string[]
  email?: string | null
  phone?: string | null
  linkedin?: string
  twitter?: string | null
  portfolio?: string | null
  available?: boolean
}

export default function BoatieList() {
  const [availablePeople, setAvailablePeople] = useState<Person[]>([])
  const [unavailablePeople, setUnavailablePeople] = useState<Person[]>([])
  
  const peopleWithAvailability = useMemo(() => {
    return boatiesData.people.map(person => ({
      ...person,
      available: person.alumni !== true
    }))
  }, [])
  
  useEffect(() => {
    const available: Person[] = []
    const unavailable: Person[] = []
    
    // Separate people based on availability
    peopleWithAvailability.forEach(person => {
      if (person.available === false) {
        unavailable.push(person)
      } else {
        available.push(person)
      }
    })
    
    // Randomize order within each group
    const shuffleArray = (array: Person[]) => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }
    
    setAvailablePeople(shuffleArray(available))
    setUnavailablePeople(shuffleArray(unavailable))
  }, [peopleWithAvailability])
  
  const renderPerson = (person: Person) => (
    <div key={person.name} className="mb-4">
      <Boatie person={person} />
    </div>
  )
  
  // Split available people into two columns
  const splitIntoColumns = (people: Person[]): [Person[], Person[]] => {
    const midpoint = Math.ceil(people.length / 2)
    return [people.slice(0, midpoint), people.slice(midpoint)]
  }
  
  const [leftAvailable, rightAvailable] = splitIntoColumns(availablePeople)
  const [leftUnavailable, rightUnavailable] = splitIntoColumns(unavailablePeople)
  
  return (
    <section aria-labelledby="team-heading" className="team-section">
      <h2 id="team-heading" className="sr-only">Our Team</h2>
      
      <div className="md:hidden flex flex-col p-4 max-w-3xl mx-auto">
        <div aria-label="Available team members">
          {availablePeople.map(renderPerson)}
        </div>
        <div aria-label="Unavailable team members">
          {unavailablePeople.map(renderPerson)}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 gap-4 p-4 max-w-3xl mx-auto">
        <div className="flex flex-col">
          {leftAvailable.map(renderPerson)}
          {leftUnavailable.map(renderPerson)}
        </div>
        <div className="flex flex-col">
          {rightAvailable.map(renderPerson)}
          {rightUnavailable.map(renderPerson)}
        </div>
      </div>
    </section>
  )
} 
