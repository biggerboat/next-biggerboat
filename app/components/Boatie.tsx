import Button from "./Button"

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

interface BoatieProps {
  person: Person
}

export default function Boatie({ person }: BoatieProps) {
  const { name, bio, skills, email, phone, linkedin, twitter, portfolio, available } = person
  
  return (
    <article className="p-2">
      <div className={`bg-white p-4 px-6 rounded-md border-black border-2 overflow-hidden shadow-md text-sm relative`}>
        {available === false && (
          <div className="absolute -right-16 -top-3 bg-biggerboat-yellow px-12 pt-10 border border-black shadow-md transform rotate-45" aria-label="This person is currently unavailable">
            Unavailable
          </div>
        )}
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        {bio && <p className="text-sm mb-2 [&_a]:underline" dangerouslySetInnerHTML={{__html: bio}}/>}
        
        {skills && skills.length > 0 && (
          <>
            <h4 className="text-lg font-bold">Skills</h4>
            <ul className="mb-4 sr-only">
              {skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <p className="mb-4" aria-hidden="true">{skills.join(', ')}</p>
          </>
        )}
        
        <div className="flex w-full">
          <div className="flex-grow pr-4">
            {email && <a href={`mailto:${email}`} className="break-all text-blue-500 underline block">{email}</a>}
            {phone && <a href={`tel:${phone}`} className="break-all text-blue-500 underline block">{phone}</a>}
          </div>
          <div className="border-l border-black px-4">
            {linkedin && <Button url={linkedin} label="LinkedIn" />}
            {twitter && <Button url={twitter} label="x.com" />}
            {portfolio && <Button url={portfolio} label="Portfolio" />}
          </div>
        </div>
      </div>
    </article>
  )
} 
