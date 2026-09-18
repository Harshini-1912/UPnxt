import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ProfileContext = createContext(null);

const STORAGE_KEY = "upnxt_profile_data";

const emptyEducation = {
  ssc: {
    institution: "",
    board: "",
    from: "",
    to: "",
    percentage: "",
    status: "",
  },

  intermediate: {
    type: "Intermediate",
    institution: "",
    board: "",
    stream: "",
    from: "",
    to: "",
    percentage: "",
    status: "",
  },

  ug: {
    degree: "",
    specialization: "",
    institution: "",
    from: "",
    to: "",
    cgpa: "",
    status: "",
  },

  pg: {
    status: "Not yet",
    degree: "",
    specialization: "",
    institution: "",
    from: "",
    to: "",
    cgpa: "",
  },
};

const defaultProfile = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    bio: "",
    gender: "Prefer not to say",
  },

  education: emptyEducation,

  skills: [],

  experience: [],

  socialProfiles: [],

  applications: [],

  savedJobs: [],

  activities: [],

  dailyChallenge: {
    streak: 0,
    title: "",
    description: "",
    progress: 0,
    lastCompletedDate: "",
  },

  lastLogin: "",

  profileUpdatedAt: "",
};

function loadProfile() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultProfile;
    }

    return {
      ...defaultProfile,
      ...JSON.parse(stored),
      personal: {
        ...defaultProfile.personal,
        ...JSON.parse(stored).personal,
      },
      education: {
        ...defaultProfile.education,
        ...JSON.parse(stored).education,
      },
    };
  } catch {
    return defaultProfile;
  }
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    setProfile((previous) => ({
      ...previous,
      lastLogin: new Date().toISOString(),
    }));
  }, []);

  const updatePersonal = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      personal: {
        ...previous.personal,
        [field]: value,
      },
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const updatePersonalBulk = (data) => {
    setProfile((previous) => ({
      ...previous,
      personal: {
        ...previous.personal,
        ...data,
      },
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const updateEducation = (section, field, value) => {
    setProfile((previous) => ({
      ...previous,
      education: {
        ...previous.education,
        [section]: {
          ...previous.education[section],
          [field]: value,
        },
      },
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const setSkills = (skills) => {
    setProfile((previous) => ({
      ...previous,
      skills,
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const addExperience = (experience) => {
    setProfile((previous) => ({
      ...previous,
      experience: [
        ...previous.experience,
        {
          id: crypto.randomUUID(),
          ...experience,
        },
      ],
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const updateExperience = (id, experience) => {
    setProfile((previous) => ({
      ...previous,
      experience: previous.experience.map((item) =>
        item.id === id ? { ...item, ...experience } : item
      ),
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const removeExperience = (id) => {
    setProfile((previous) => ({
      ...previous,
      experience: previous.experience.filter((item) => item.id !== id),
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const addSocialProfile = (social) => {
    setProfile((previous) => ({
      ...previous,
      socialProfiles: [
        ...previous.socialProfiles,
        {
          id: crypto.randomUUID(),
          ...social,
        },
      ],
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const updateSocialProfile = (id, social) => {
    setProfile((previous) => ({
      ...previous,
      socialProfiles: previous.socialProfiles.map((item) =>
        item.id === id ? { ...item, ...social } : item
      ),
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const removeSocialProfile = (id) => {
    setProfile((previous) => ({
      ...previous,
      socialProfiles: previous.socialProfiles.filter(
        (item) => item.id !== id
      ),
      profileUpdatedAt: new Date().toISOString(),
    }));
  };

  const addActivity = (activity) => {
    setProfile((previous) => ({
      ...previous,
      activities: [
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          ...activity,
        },
        ...previous.activities,
      ],
    }));
  };

  const addApplication = (application) => {
    setProfile((previous) => ({
      ...previous,
      applications: [
        ...previous.applications,
        {
          id: crypto.randomUUID(),
          appliedAt: new Date().toISOString(),
          status: "Applied",
          ...application,
        },
      ],
    }));
  };

  const updateApplication = (id, updates) => {
    setProfile((previous) => ({
      ...previous,
      applications: previous.applications.map((application) =>
        application.id === id
          ? { ...application, ...updates }
          : application
      ),
    }));
  };

  const removeApplication = (id) => {
    setProfile((previous) => ({
      ...previous,
      applications: previous.applications.filter(
        (application) => application.id !== id
      ),
    }));
  };

  const addSavedJob = (job) => {
    setProfile((previous) => {
      const exists = previous.savedJobs.some(
        (item) => item.id === job.id
      );

      if (exists) {
        return previous;
      }

      return {
        ...previous,
        savedJobs: [
          ...previous.savedJobs,
          {
            ...job,
            savedAt: new Date().toISOString(),
          },
        ],
      };
    });
  };

  const removeSavedJob = (id) => {
    setProfile((previous) => ({
      ...previous,
      savedJobs: previous.savedJobs.filter((job) => job.id !== id),
    }));
  };

  const profileCompletion = useMemo(() => {
    const checks = [
      profile.personal.name,
      profile.personal.email,
      profile.personal.phone,
      profile.personal.location,
      profile.personal.headline,
      profile.personal.gender,

      profile.education.ssc.institution,
      profile.education.ssc.status,

      profile.education.intermediate.institution,
      profile.education.intermediate.status,

      profile.education.ug.institution,
      profile.education.ug.status,

      profile.skills.length > 0,

      profile.socialProfiles.length > 0,
    ];

    if (
      profile.education.pg.status === "Pursuing" ||
      profile.education.pg.status === "Completed"
    ) {
      checks.push(profile.education.pg.institution);
      checks.push(profile.education.pg.degree);
    }

    const completed = checks.filter(
      (item) => item !== "" && item !== undefined && item !== null
    ).length;

    return Math.round((completed / checks.length) * 100);
  }, [profile]);

  const value = {
    profile,
    setProfile,

    updatePersonal,
    updatePersonalBulk,

    updateEducation,

    setSkills,

    addExperience,
    updateExperience,
    removeExperience,

    addSocialProfile,
    updateSocialProfile,
    removeSocialProfile,

    addActivity,

    addApplication,
    updateApplication,
    removeApplication,

    addSavedJob,
    removeSavedJob,

    profileCompletion,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfile must be used inside ProfileProvider"
    );
  }

  return context;
}