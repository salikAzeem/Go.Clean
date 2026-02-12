import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Upload, AlertCircle, Hash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ReportDumping = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 👇 GET BIN ID FROM QR URL
  const [searchParams] = useSearchParams();
  const [binId, setBinId] = useState("");

  useEffect(() => {
    const id = searchParams.get("binId");
    if (id) {
      setBinId(id);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Report Submitted Successfully!",
      description: `Report recorded for Dustbin ${binId || "Manual Entry"}. Thank you for helping keep our environment clean.`,
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
    setBinId(""); // optional reset
  };

  return (
    <section id="report" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-foreground">Report Illegal Dumping</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us track and stop illegal waste disposal in your community. Your report makes a difference.
          </p>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-2xl">Submit a Report</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us respond quickly
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* BIN SERIAL NUMBER (AUTO FILLED FROM QR) */}
              <div className="space-y-2">
                <Label htmlFor="binId" className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary" />
                  Dustbin Serial Number
                </Label>
                <Input
                  id="binId"
                  value={binId}
                  placeholder="Scan QR to auto-fill"
                  readOnly
                  className="w-full bg-muted"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Location / Address
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter location address"
                    required
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Using Google Maps API integration
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Contact Number
                  </Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="Your phone number"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you observed (type of waste, quantity, etc.)"
                  rows={4}
                  required
                  className="w-full resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photos" className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary" />
                  Upload Photos / Videos
                </Label>
                <Input
                  id="photos"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Photos and videos help authorities respond more effectively
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ReportDumping;
