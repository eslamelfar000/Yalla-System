"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import React from 'react';

const ProfileProgress = () => {
  return (
  <Card>
    <CardHeader className="border-none mb-0">
      <CardTitle className="text-lg font-medium text-default-800">Sessions Progress</CardTitle>
    </CardHeader>
    <CardContent className="px-4">
    <div className="flex flex-col items-end gap-1">
        <Label className="text-sm font-medium text-default-700">62% Complete</Label>
        <Progress value={62}  color="main" isStripe className="w-full bg-gray-200"  />
      </div>
    </CardContent>
  </Card>
  );
};

export default ProfileProgress;