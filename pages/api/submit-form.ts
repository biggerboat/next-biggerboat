import type { NextApiRequest, NextApiResponse } from 'next'

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, phone, subject, details } = req.body

  const message = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🆕 New Contact Form Submission',
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Name:*\n${name}`
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${email}`
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Phone:*\n${phone || 'Not provided'}`
          },
          {
            type: 'mrkdwn',
            text: `*Subject:*\n${subject}`
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Details:*\n${details}`
        }
      }
    ]
  }

  try {
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    })

    if (!slackResponse.ok) {
      throw new Error('Slack notification failed')
    }

    res.status(200).json({ message: 'Form submitted successfully' })
  } catch (error) {
    console.error('Error sending to Slack:', error)
    res.status(500).json({ message: 'Error submitting form' })
  }
} 