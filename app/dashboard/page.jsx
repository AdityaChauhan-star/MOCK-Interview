import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/interviewlist";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">AI</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              AI Interview Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Welcome Back
            </h2>
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Create, manage, and track your AI-powered mock interviews with ease.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Interviews</p>
                <h3 className="text-2xl font-semibold text-foreground">25</h3>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-md">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-semibold text-foreground">18</h3>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-md">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-semibold text-foreground">7</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Interview Section */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8 border border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-foreground">
              Start a New Interview
            </h3>
            <button className="text-sm text-primary hover:text-primary-foreground font-medium transition-colors">
               →
            </button>
          </div>
          <AddNewInterview />
        </div>

        {/* Interview List Section */}
        <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              Your Interviews
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors">
                Filter
              </button>
              <button className="px-3 py-1 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors">
                Sort
              </button>
            </div>
          </div>
          <InterviewList />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI Mock Interview Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;