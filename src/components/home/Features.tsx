
import React from 'react';
import { FadeIn, FadeInStagger } from '@/components/transitions/FadeIn';
import { Bot, Code, Database, Layers, Wand2, Wallet } from 'lucide-react';

const features = [
  {
    name: 'AI Builder',
    description:
      'Create a complete Web3 website just by describing your project in natural language.',
    icon: Bot,
  },
  {
    name: 'Premium Templates',
    description:
      'Choose from dozens of professionally designed, fully responsive Web3 website templates.',
    icon: Layers,
  },
  {
    name: 'Token Creation',
    description:
      'Launch your own token with simple smart contract deployment tools for various blockchains.',
    icon: Wallet,
  },
  {
    name: 'Custom Domains',
    description:
      'Connect your own domain name and deploy your project with a single click.',
    icon: Database,
  },
  {
    name: 'Web3 Integration',
    description:
      'Connect wallets, implement token gates, and add blockchain functionality easily.',
    icon: Code,
  },
  {
    name: 'No-Code Editor',
    description:
      'Edit your website visually without writing a single line of code.',
    icon: Wand2,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Deploy Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to launch your Web3 project
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our comprehensive toolkit combines AI, no-code tools, and Web3 technology to make building blockchain projects accessible to everyone.
            </p>
          </div>
        </FadeIn>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <FadeInStagger className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="glass-panel hover:bg-white/90 rounded-xl p-8 flex flex-col items-start">
                <div className="rounded-md bg-primary/10 p-2 ring-1 ring-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-7">{feature.name}</h3>
                <p className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </div>
  );
}
