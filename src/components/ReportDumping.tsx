import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Upload, Hash, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ReportDumping = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const [binId, setBinId] = useState("");
  const [location, setLocation] = useState("Fetching location...");
  const [issueType, setIssueType] = useState("");

  // contact + details state
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");

  // QR bin detection
  useEffect(() => {
    const id = searchParams.get("binId");
    if (id) setBinId(id);
  }, [searchParams]);

  // GPS Auto detection
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation(`https://maps.google.com/?q=${lat},${lng}`);
        },
        () => {
          setLocation("Location access denied. Enter manually.");
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!issueType) {
      toast({
        title: "Please select issue type",
        description: "Select the type of problem before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    try {

      const reportData = {
        binId,
        issueType,
        location,
        contact,
        details
      };

      const response = await fetch("http://localhost:5000/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Report Submitted Successfully!",
          description: "Your complaint has been recorded.",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "Something went wrong.",
        });
      }

    } catch (error) {
      toast({
        title: "Server Error",
        description: "Unable to submit report.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      <div className="w-full max-w-3xl">

        {/* FLOW INDICATOR */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="bg-green-700 text-white px-6 py-2 rounded-lg shadow">
            Camera
          </div>
          <span className="text-2xl font-bold text-white">→</span>
          <div className="bg-green-700 text-white px-6 py-2 rounded-lg shadow">
            Data
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Report Waste Issue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* BIN ID */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4" />
                Dustbin Serial Number
              </Label>
              <Input value={binId} readOnly className="bg-gray-100" />
            </div>

            {/* ISSUE TYPE */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4" />
                Issue Type
              </Label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select Issue Type</option>
                <option value="Illegal Dumping">Illegal Dumping</option>
                <option value="Overflowing Bin">Overflowing Bin</option>
                <option value="Damaged Bin">Damaged Bin</option>
              </select>
            </div>

            {/* LOCATION */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                Address (Auto GPS)
              </Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* CONTACT */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4" />
                Contact Number
              </Label>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            {/* DETAILS */}
            <div>
              <Label className="mb-2">Additional Details</Label>
              <Textarea
                rows={3}
                placeholder="Describe the issue briefly..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>

            {/* FILE */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Upload className="w-4 h-4" />
                Upload Photo / Video Evidence
              </Label>
              <Input type="file" accept="image/*,video/*" />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 text-lg rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>

          </form>
        </div>

        <p className="text-center text-white mt-6 text-sm italic">
          True development begins with a clean and conscious community.
        </p>

      </div>
    </section>
  );
};

export default ReportDumping;