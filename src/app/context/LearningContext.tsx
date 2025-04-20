"use client";
import React, { createContext, useContext, useState } from 'react';

interface LearningContextType {
  isNewLearningAdded: boolean;
  setIsNewLearningAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

const LearningContext = createContext<LearningContextType | null>(null);

export const useLearningState = () => {
  return useContext(LearningContext);
};

import { ReactNode } from 'react';

export const LearningProvider = ({ children }: { children: ReactNode }) => {
  const [isNewLearningAdded, setIsNewLearningAdded] = useState(false);


  return (
    <LearningContext.Provider
      value={{
        isNewLearningAdded,
        setIsNewLearningAdded,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};
