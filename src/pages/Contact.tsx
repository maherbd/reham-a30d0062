
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/transitions/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Mail, MessageSquare, Phone } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate form submission
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your message has been sent. We'll get back to you soon!");
      form.reset();
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Have questions or need assistance? We're here to help you with your Web3 journey.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <FadeIn className="lg:col-span-2">
                <div className="glass-panel p-6 sm:p-10 rounded-2xl">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What's this about?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your message" 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="primary-button px-8"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </FadeIn>
              
              <FadeIn>
                <div className="space-y-8">
                  <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Email Us</h4>
                          <p className="text-sm text-muted-foreground mt-1">Our team will respond within 24 hours</p>
                          <a href="mailto:support@reham.org" className="text-primary hover:underline mt-2 block">
                            support@reham.org
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Live Chat</h4>
                          <p className="text-sm text-muted-foreground mt-1">Available Monday to Friday, 9am-5pm UTC</p>
                          <Button variant="link" className="text-primary p-0 h-auto mt-2">
                            Start a conversation
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Call Us</h4>
                          <p className="text-sm text-muted-foreground mt-1">For urgent inquiries</p>
                          <a href="tel:+11234567890" className="text-primary hover:underline mt-2 block">
                            +1 (123) 456-7890
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">FAQ</h3>
                    <p className="text-muted-foreground mb-4">
                      Find quick answers to common questions about our platform.
                    </p>
                    <Button variant="outline" className="w-full glass-button">
                      Visit FAQ Page
                    </Button>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM (UTC)
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Saturday: 10:00 AM - 2:00 PM (UTC)
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
