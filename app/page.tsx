import Hero from './components/home/Hero'
import Marketplace from './components/home/Marketplace'
import HowItWorks from './components/home/HowItWorks'
import Roles from './components/home/Roles'
import Why from './components/home/Why'
import Mining from './components/home/Mining'
import Explore from './components/home/Explore'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marketplace />
      <HowItWorks />
      <Roles />
      <Why />
      <Mining />
      <Explore />
    </main>
  )
}
