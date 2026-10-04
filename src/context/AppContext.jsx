import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  INITIAL_HERO_SLIDES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_STUDENT_RESUMES,
  INITIAL_OPPORTUNITIES,
  INITIAL_APPLICATIONS,
  INITIAL_REFERRAL_REQUESTS,
  INITIAL_CHAT_THREADS,
  INITIAL_ALUM_NOTIFICATIONS,
  INITIAL_ADMIN_USERS,
  INITIAL_FEEDBACK_NETWORK_RECORDS,
  DEMO_USERS
} from '../data/mockData';

const AppContext = createContext();

const roleHomePath = (role) => {
  if (role === 'Alumni') return '/alumni';
  if (role === 'Admin') return '/admin';
  return '/student';
};

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  // Auth & Session State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('unidome_auth_active') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('unidome_user_session');
    return savedUser ? JSON.parse(savedUser) : DEMO_USERS.student;
  });

  const currentRole = currentUser?.role || 'Student';

  const loadInitialData = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`unidome_db_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [heroSlides, setHeroSlides] = useState(INITIAL_HERO_SLIDES);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [studentResumes, setStudentResumes] = useState(() => loadInitialData('studentResumes', INITIAL_STUDENT_RESUMES));
  const [opportunities, setOpportunities] = useState(() => loadInitialData('opportunities', INITIAL_OPPORTUNITIES));
  const [applications, setApplications] = useState(() => loadInitialData('applications', INITIAL_APPLICATIONS));
  const [referralRequests, setReferralRequests] = useState(() => loadInitialData('referralRequests', INITIAL_REFERRAL_REQUESTS));
  const [chatThreads, setChatThreads] = useState(() => loadInitialData('chatThreads', INITIAL_CHAT_THREADS));
  const [alumNotifications, setAlumNotifications] = useState(() => loadInitialData('notifications', INITIAL_ALUM_NOTIFICATIONS));
  const [adminUsers, setAdminUsers] = useState(() => loadInitialData('adminUsers', INITIAL_ADMIN_USERS));
  const [feedbackNetwork, setFeedbackNetwork] = useState(() => loadInitialData('feedbackNetwork', INITIAL_FEEDBACK_NETWORK_RECORDS));

  // Modals & Drawers
  const [activeChatThreadId, setActiveChatThreadId] = useState('thread-1');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedReviewApp, setSelectedReviewApp] = useState(null);
  const [isPostOpportunityOpen, setIsPostOpportunityOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isFeedbackNetworkOpen, setIsFeedbackNetworkOpen] = useState(false);
  const [isAccessTransferOpen, setIsAccessTransferOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('unidome_auth_active', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('unidome_user_session', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('unidome_db_studentResumes', JSON.stringify(studentResumes));
  }, [studentResumes]);

  useEffect(() => {
    localStorage.setItem('unidome_db_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('unidome_db_applications', JSON.stringify(applications));
  }, [applications]);

  // Root dark/light class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Quick 1-Click Login Handlers
  const loginAsStudent = () => {
    setCurrentUser(DEMO_USERS.student);
    setIsAuthenticated(true);
    navigate('/student');
  };

  const loginAsAlumni = () => {
    setCurrentUser(DEMO_USERS.alumni);
    setIsAuthenticated(true);
    navigate('/alumni');
  };

  const loginCustom = (email, role) => {
    if (role === 'Student') {
      setCurrentUser({
        ...DEMO_USERS.student,
        email: email || DEMO_USERS.student.email
      });
    } else {
      setCurrentUser({
        ...DEMO_USERS.alumni,
        email: email || DEMO_USERS.alumni.email
      });
    }
    setIsAuthenticated(true);
    navigate(roleHomePath(role));
  };

  const registerUser = (userData) => {
    const newUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setIsRegisterModalOpen(false);
    navigate(roleHomePath(newUser.role));
  };

  const signOut = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const setCurrentRole = (role) => {
    if (role === 'Student') {
      setCurrentUser(DEMO_USERS.student);
    } else if (role === 'Alumni') {
      setCurrentUser(DEMO_USERS.alumni);
    } else {
      setCurrentUser({
        name: 'Prof. S. R. Kulkarni',
        email: 'warden.patel@iitkgp.ac.in',
        role: 'Admin',
        hall: 'Patel Hall of Residence'
      });
    }
    navigate(roleHomePath(role));
  };

  // Student 4-Resume Management
  const updateStudentResume = (resumeId, updatedData) => {
    setStudentResumes(prev =>
      prev.map(r => (r.id === resumeId ? { ...r, ...updatedData, lastUpdated: 'Just now' } : r))
    );
  };

  // Toggle opportunity active/closed status
  const toggleOpportunityStatus = (oppId) => {
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === oppId
          ? { ...opp, status: opp.status === 'Active' ? 'Closed' : 'Active' }
          : opp
      )
    );
  };

  // Post new opportunity
  const addOpportunity = (newDriveData) => {
    const newDrive = {
      id: `opp-${Date.now()}`,
      companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
      alumName: currentUser.name,
      alumBatch: currentUser.batch || 'Patel Hall Class of \'21',
      alumProfile: currentUser.profileTitle || 'Lead Alumni Mentor',
      alumAvatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      postedDate: 'Just now',
      applicantsCount: 0,
      status: 'Active',
      ...newDriveData
    };
    setOpportunities(prev => [newDrive, ...prev]);
    setIsPostOpportunityOpen(false);
  };

  const deleteOpportunity = (oppId) => {
    setOpportunities(prev => prev.filter(o => o.id !== oppId));
  };

  // Student apply to opportunity with selected resume profile & pitch
  const submitApplication = ({ opportunityId, selectedResumeId, pitchNote }) => {
    const matchedOpp = opportunities.find(o => o.id === opportunityId) || opportunities[0];
    const matchedResume = studentResumes.find(r => r.id === selectedResumeId) || studentResumes[0];

    const newApp = {
      id: `app-${Date.now()}`,
      opportunityId: matchedOpp.id,
      selectedResumeId: matchedResume.id,
      selectedResumeTitle: matchedResume.title,
      jobTitle: matchedOpp.title,
      company: matchedOpp.company,
      studentName: currentUser.name || 'Sanya Gupta',
      studentRoll: currentUser.rollNumber || '2021CSB1042',
      studentEmail: currentUser.email || 'sanya.g@kgpian.iitkgp.ac.in',
      studentMajor: currentUser.department || 'Computer Science & Design',
      studentBatch: currentUser.batch || 'Batch of \'25 (Patel Hall Room D-304)',
      studentCpa: currentUser.cpa || '9.2 / 10.0',
      alumName: matchedOpp.alumName,
      appliedDate: 'Just now',
      status: 'Pending Review',
      decisionType: null,
      privateNotificationSent: false,
      note: pitchNote || matchedResume.aboutStatement,
      cvFileName: matchedResume.fileName,
      cvFileSize: matchedResume.fileSize,
      cvUrl: '#',
      scoreOutOf10: null,
      whatStoodOut: '',
      tipsAndSuggestions: '',
      feedbackShortcutsUsed: []
    };

    setApplications(prev => [newApp, ...prev]);

    // Update applicants count on opportunity
    setOpportunities(prev =>
      prev.map(o =>
        o.id === matchedOpp.id ? { ...o, applicantsCount: (o.applicantsCount || 0) + 1 } : o
      )
    );

    // Notify Alumni
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'New Student CV Submitted for Review',
      description: `${currentUser.name} applied for ${matchedOpp.title} (${matchedOpp.company}) using ${matchedResume.title}`,
      time: 'Just now',
      read: false,
      appId: newApp.id
    };
    setAlumNotifications(prev => [newNotif, ...prev]);
  };

  // Submit structured Alumni review
  const submitAlumniReview = ({
    appId,
    decisionType,
    scoreOutOf10,
    whatStoodOut,
    tipsAndSuggestions,
    selectedShortcuts
  }) => {
    const isAccepted = decisionType === 'accepted';
    const newStatus = isAccepted ? 'Accepted and Proceeded' : 'Feedback Provided';

    setApplications(prev =>
      prev.map(app =>
        app.id === appId
          ? {
              ...app,
              status: newStatus,
              decisionType,
              privateNotificationSent: true,
              scoreOutOf10: parseFloat(scoreOutOf10),
              whatStoodOut,
              tipsAndSuggestions,
              feedbackShortcutsUsed: selectedShortcuts
            }
          : app
      )
    );

    const targetApp = applications.find(a => a.id === appId);
    if (targetApp) {
      // Append to private feedback network ledger
      const networkEntry = {
        id: `fn-${Date.now()}`,
        studentName: targetApp.studentName,
        studentRoll: targetApp.studentRoll,
        studentEmail: targetApp.studentEmail,
        company: targetApp.company,
        jobTitle: targetApp.jobTitle,
        alumName: currentUser.name,
        alumBatch: currentUser.batch,
        decision: newStatus,
        scoreOutOf10: parseFloat(scoreOutOf10),
        feedbackText: whatStoodOut,
        tips: tipsAndSuggestions,
        shortcuts: selectedShortcuts,
        timestamp: 'Just now'
      };
      setFeedbackNetwork(prev => [networkEntry, ...prev]);

      // Create or update chat thread to privately notify student
      const existingThread = chatThreads.find(t => t.ticketId === appId);
      const decisionMessageText = isAccepted
        ? `Hello ${targetApp.studentName}, your CV and approach for ${targetApp.jobTitle} (${targetApp.company}) have been accepted to proceed privately! CV Score: ${scoreOutOf10}/10. What stood out: "${whatStoodOut}". Next stage formulation is in motion.`
        : `Hi ${targetApp.studentName}, thank you for your submission for ${targetApp.jobTitle}. I've scored your CV ${scoreOutOf10}/10 and dropped detailed feedback & actionable tips to strengthen your CV. Tips: "${tipsAndSuggestions}".`;

      if (existingThread) {
        sendChatMessage(existingThread.id, decisionMessageText, 'ALUM', currentUser.name);
      } else {
        const newThread = {
          id: `thread-${Date.now()}`,
          ticketId: appId,
          title: `${targetApp.company} - ${targetApp.jobTitle} (${targetApp.studentName})`,
          participants: [`${targetApp.studentName} (Student)`, `${currentUser.name} (ALUM)`],
          messages: [
            {
              id: `m-${Date.now()}`,
              senderRole: 'ALUM',
              senderName: currentUser.name,
              text: decisionMessageText,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
        setChatThreads(prev => [newThread, ...prev]);
      }
    }

    setSelectedReviewApp(null);
  };

  const startFollowUpChat = (appId, alumName, companyTitle) => {
    let thread = chatThreads.find(t => t.ticketId === appId);
    if (!thread) {
      thread = {
        id: `thread-${Date.now()}`,
        ticketId: appId,
        title: `${companyTitle} - Student Follow-up`,
        participants: [`${currentUser.name} (Student)`, `${alumName} (ALUM)`],
        messages: [
          {
            id: `m-${Date.now()}`,
            senderRole: 'Student',
            senderName: currentUser.name,
            text: `Hello ${alumName}, following up on my application for ${companyTitle}. Thank you for reviewing my CV!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      setChatThreads(prev => [thread, ...prev]);
    }
    setActiveChatThreadId(thread.id);
    setIsChatOpen(true);
  };

  const markNotificationsRead = () => {
    setAlumNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const sendChatMessage = (threadId, text, senderRole, senderName) => {
    const newMsg = {
      id: `m-${Date.now()}`,
      senderRole,
      senderName,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatThreads(prev =>
      prev.map(thread =>
        thread.id === threadId ? { ...thread, messages: [...thread.messages, newMsg] } : thread
      )
    );
  };

  const exportDatabaseBackup = () => {
    const dataStr = JSON.stringify({
      studentResumes,
      opportunities,
      applications,
      feedbackNetwork,
      chatThreads,
      referralRequests,
      adminUsers
    }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Patel_Hall_Ledger_Export_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Admin: update an application's status directly from the master ticket table
  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev =>
      prev.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
    );
  };

  // Admin: restore studentResumes/opportunities/applications/etc. from an exported JSON backup
  const importDatabaseBackup = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') return false;
      if (data.studentResumes) setStudentResumes(data.studentResumes);
      if (data.opportunities) setOpportunities(data.opportunities);
      if (data.applications) setApplications(data.applications);
      if (data.feedbackNetwork) setFeedbackNetwork(data.feedbackNetwork);
      if (data.chatThreads) setChatThreads(data.chatThreads);
      if (data.referralRequests) setReferralRequests(data.referralRequests);
      if (data.adminUsers) setAdminUsers(data.adminUsers);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Admin: hand off "Primary Admin" status to another team member
  const transferAdminAccess = (userId, roleScope) => {
    setAdminUsers(prev =>
      prev.map(u => {
        if (u.id === userId) return { ...u, status: 'Primary Admin', role: roleScope };
        if (u.status === 'Primary Admin') return { ...u, status: 'Admin' };
        return u;
      })
    );
  };

  // Student: submit a custom referral/external-POC request for Admin to verify
  const submitCustomReferralRequest = (requestData) => {
    const newRequest = {
      id: `req-${Date.now()}`,
      studentName: currentUser.name || 'Sanya Gupta',
      studentRoll: currentUser.rollNumber || '2021CSB1042',
      studentEmail: currentUser.email || 'sanya.g@kgpian.iitkgp.ac.in',
      status: 'Pending Admin Verification',
      submittedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      ...requestData
    };
    setReferralRequests(prev => [newRequest, ...prev]);
  };

  // Student/Alumni: generate a UniDome ID during the Gmail/manual registration flow
  const registerGmailDomeId = ({ email, fullName, role, rollNo, companyName }) => {
    const newUser = {
      name: fullName,
      email,
      role,
      rollNumber: rollNo,
      hall: 'Patel Hall of Residence',
      company: companyName,
      domeId: `PATEL-${(role || 'USR').toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    navigate(roleHomePath(role));
    return newUser;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isAuthenticated,
        setIsAuthenticated,
        loginAsStudent,
        loginAsAlumni,
        loginCustom,
        registerUser,
        signOut,
        currentRole,
        setCurrentRole,
        currentUser,
        setCurrentUser,
        heroSlides,
        announcements,
        studentResumes,
        updateStudentResume,
        opportunities,
        addOpportunity,
        deleteOpportunity,
        toggleOpportunityStatus,
        applications,
        submitApplication,
        submitAlumniReview,
        startFollowUpChat,
        selectedReviewApp,
        setSelectedReviewApp,
        isPostOpportunityOpen,
        setIsPostOpportunityOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        isFeedbackNetworkOpen,
        setIsFeedbackNetworkOpen,
        activeChatThreadId,
        setActiveChatThreadId,
        isChatOpen,
        setIsChatOpen,
        alumNotifications,
        markNotificationsRead,
        chatThreads,
        sendChatMessage,
        feedbackNetwork,
        exportDatabaseBackup,
        referralRequests,
        adminUsers,
        isAccessTransferOpen,
        setIsAccessTransferOpen,
        updateApplicationStatus,
        importDatabaseBackup,
        transferAdminAccess,
        registerGmailDomeId,
        submitCustomReferralRequest
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
