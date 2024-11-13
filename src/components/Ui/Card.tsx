// Card.tsx
import React from "react";
import Image from "next/image";
import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`card-container ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`card-header ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`card-content ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardProps) {
  return <div className={`card-footer ${className}`}>{children}</div>;
}

interface ScholarshipCardProps {
  date: string;
  title: string;
  subtitle: string;
  amount: string;
  logoSrc?: string;
}

export function ScholarshipCard({
  date,
  title,
  subtitle,
  amount,
  logoSrc = "/placeholder.svg"
}: ScholarshipCardProps) {
  return (
    <Card className="scholarship-card">
      <div className="scholarship-header">
        <div className="scholarship-logo">
          <Image src={logoSrc} alt={`${title} 로고`} width={40} height={40} className="logo-image" />
        </div>
        <div>
          <div className="scholarship-date">{date}</div>
          <h3 className="scholarship-title">{title}</h3>
          <div className="scholarship-subtitle">{subtitle}</div>
          <div className="scholarship-amount">{amount}점</div>
        </div>
      </div>
      <button className="scholarship-button">담기</button>
    </Card>
  );
}