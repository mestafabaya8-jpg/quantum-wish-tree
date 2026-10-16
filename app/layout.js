import './globals.css'

export const metadata = {
  title: 'Eternal Love - Vos vœux gravés sur la Blockchain',
  description: 'Enregistrez pour l\'éternité vos messages d\'amour sur le réseau Layer 2.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}