import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  href:string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,href
}) => (
  <div>
    <h1>Welcome, {firstName}!<br/>
    click <a href={href}>here</a> to download</h1>
  </div>
);

