import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Mail, Phone, Globe, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignatureData {
  name: string;
  title: string;
  email: string;
  phone: string;
  mobile: string;
  website: string;
  address: string;
}

const EmailSignature = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: "John Smith",
    title: "Senior Manager",
    email: "john.smith@ggs-group.com",
    phone: "+971 4 123 4567",
    mobile: "+971 50 123 4567",
    website: "www.ggs-group.com",
    address: "Dubai, United Arab Emirates"
  });

  const updateField = (field: keyof SignatureData, value: string) => {
    setSignatureData(prev => ({ ...prev, [field]: value }));
  };

  const generateSignatureHTML = () => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; line-height: 1.4; color: #333;">
  <tr>
    <td style="padding-right: 20px; vertical-align: top;">
      <img src="data:image/png;base64,${getLogoBase64()}" alt="GGS Group" style="width: 120px; height: auto;" />
    </td>
    <td style="border-left: 3px solid #6BAE47; padding-left: 20px; vertical-align: top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size: 18px; font-weight: 600; color: #2c3e50; padding-bottom: 4px;">
            ${signatureData.name}
          </td>
        </tr>
        <tr>
          <td style="font-size: 14px; color: #6BAE47; font-weight: 500; padding-bottom: 12px;">
            ${signatureData.title}
          </td>
        </tr>
        <tr>
          <td style="font-size: 16px; font-weight: 600; color: #6BAE47; padding-bottom: 8px;">
            Giant General Services Group
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 4px;">
            <span style="color: #7f8c8d; font-size: 12px;">📧</span>
            <a href="mailto:${signatureData.email}" style="color: #2c3e50; text-decoration: none; margin-left: 8px; font-size: 13px;">
              ${signatureData.email}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 4px;">
            <span style="color: #7f8c8d; font-size: 12px;">📞</span>
            <span style="color: #2c3e50; margin-left: 8px; font-size: 13px;">
              ${signatureData.phone}
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 4px;">
            <span style="color: #7f8c8d; font-size: 12px;">📱</span>
            <span style="color: #2c3e50; margin-left: 8px; font-size: 13px;">
              ${signatureData.mobile}
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 4px;">
            <span style="color: #7f8c8d; font-size: 12px;">🌐</span>
            <a href="http://${signatureData.website}" style="color: #2c3e50; text-decoration: none; margin-left: 8px; font-size: 13px;">
              ${signatureData.website}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 8px;">
            <span style="color: #7f8c8d; font-size: 12px;">📍</span>
            <span style="color: #2c3e50; margin-left: 8px; font-size: 13px;">
              ${signatureData.address}
            </span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();
  };

  const getLogoBase64 = () => {
    // This would normally be the base64 encoded logo
    // For demo purposes, we'll return a placeholder
    return "";
  };

  const copySignature = async () => {
    try {
      const signatureHTML = generateSignatureHTML();
      await navigator.clipboard.writeText(signatureHTML);
      setCopied(true);
      toast({
        title: "Signature Copied!",
        description: "The HTML signature has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please try copying manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Email Signature Generator</h1>
          <p className="text-muted-foreground mt-2">Create your professional GGS Group email signature</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-accent" />
                Signature Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={signatureData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={signatureData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Enter your job title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={signatureData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Office Phone</Label>
                <Input
                  id="phone"
                  value={signatureData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="Enter office phone"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Phone</Label>
                <Input
                  id="mobile"
                  value={signatureData.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  placeholder="Enter mobile phone"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={signatureData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="Enter website"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={signatureData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Enter address"
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  Signature Preview
                </span>
                <Button
                  onClick={copySignature}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy HTML"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-background p-6 border">
                {/* Signature Preview */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <img 
                      src="/assets/ggs-logo.png" 
                      alt="GGS Group Logo" 
                      className="w-24 h-auto"
                    />
                  </div>
                  <div className="border-l-4 border-accent pl-5 flex-1">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-primary">
                        {signatureData.name}
                      </h3>
                      <p className="text-sm font-medium text-accent">
                        {signatureData.title}
                      </p>
                      <p className="text-base font-semibold text-accent mt-2">
                        Giant General Services Group
                      </p>
                    </div>
                    
                    <div className="mt-3 space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <a 
                          href={`mailto:${signatureData.email}`} 
                          className="text-primary hover:underline"
                        >
                          {signatureData.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-primary">{signatureData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-primary">{signatureData.mobile}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3 text-muted-foreground" />
                        <a 
                          href={`http://${signatureData.website}`} 
                          className="text-primary hover:underline"
                        >
                          {signatureData.website}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-primary">{signatureData.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-2">How to use:</h4>
                <ol className="text-xs text-muted-foreground space-y-1">
                  <li>1. Click "Copy HTML" above</li>
                  <li>2. Open Outlook → File → Options → Mail → Signatures</li>
                  <li>3. Create new signature and paste the HTML code</li>
                  <li>4. Set as default signature for new messages</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailSignature;