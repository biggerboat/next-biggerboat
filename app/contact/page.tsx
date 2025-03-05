"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Wave from '../components/Wave'
import Boat from '../components/Boat'
import Lighthouse from '../components/Lighthouse'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import { useToast } from '../context/ToastContext'

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  details: string
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const router = useRouter()
  const { showToast } = useToast()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        showToast('Message sent successfully!', 'success')
        router.push('/')
      } else {
        setSubmitStatus('error')
        showToast('Something went wrong. Please try again.', 'error')
      }
    } catch (error) {
      setSubmitStatus('error')
      showToast('Something went wrong. Please try again.', 'error')
    }
    setIsSubmitting(false)
  }

  return (
    <main>
      <Image src="/logo.png" alt="Biggerboat" width={279} height={107} className="absolute left-10 top-12" />
      <Lighthouse className="absolute right-0 top-0 hidden lg:block" />
      <div className="w-[300px] prose leading-tight absolute left-10 md:left-auto md:right-[150px] md:top-[300px] top-[200px]">
        <h1 className="text-3xl font-bold mb-6">Need help? Send us a message!</h1>
        <p>Include details like project description, start of production, deadlines and of course the skills you're looking for.</p>
        <p>We will handle your information discreetly and (most probably) not sell it to Nigerian scam pirates.</p>
      </div>
      <div className="relative h-[700px] animate-float pointer-events-none">
        <Wave position="back" className="bottom-5" />
        <Boat className="absolute bottom-[-15px] left-0 right-0 mx-auto" />
        <Wave position="front" className="bottom-0" />
      </div>
      <div className="w-full -mt-4 pt-4 bg-[url('/background-water.png')]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
          <Input
            {...register('name', { required: true })}
            placeholder="Name"
            error={errors.name}
            errorMessage="Name is required"
            label="Name"
          />

          <Input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
            error={errors.email}
            errorMessage="Valid email is required"
            label="Email Address"
          />

          <Input
            {...register('phone')}
            placeholder="Phone (optional)"
            label="Phone Number"
          />

          <Input
            {...register('subject', { required: true })}
            placeholder="Subject"
            error={errors.subject}
            errorMessage="Subject is required"
            label="Subject"
          />

          <TextArea
            {...register('details', { required: true })}
            placeholder="Details - Be as specific as you can!"
            error={errors.details}
            errorMessage="Details are required"
            label="Project Details"
          />

          <div className="space-y-4">
            <label className="flex items-start">
              <input type="checkbox" required className="mt-1 mr-2" />
              <span className="text-sm">
                I understand that this message is sent to all members of Bigger Boat. I either need your help on a project of the company I work for, or I'm hoping to help out friends or colleagues from another company, but I'm not on the prowl to serve as an intermediary — I'm not acting as a recruiter.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
} 
