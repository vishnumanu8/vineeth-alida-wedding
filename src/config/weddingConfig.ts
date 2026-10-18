/**
 * =======================================================================
 * VINEETH & ALIDA — WEDDING RECEPTION INVITATION CONFIGURATION
 * =======================================================================
 * This file is the single source of truth for all wedding details.
 * To customize the invitation, simply update the values below.
 */

export interface CoupleProfile {
  name: string;
  fullName: string;
  title: string;
  familyNote: string;
  oneLiner?: string;
  portrait: string;
  originCity: string;
}

export interface WishRecipient {
  id: string;
  name: string;
  role: string;
  phone: string; // WhatsApp number with country code, no + or spaces, e.g. "919876543210"
  label?: string;
}

export interface WeddingConfig {
  couple: {
    groom: CoupleProfile;
    bride: CoupleProfile;
    monogram: string;
    combinedNames: string;
    hashtag?: string;
    originJourney?: {
      from: string;
      to: string;
      note: string;
    };
  };

  family: {
    invitationHeadline: string;
    invitationMessage: string;
    warmClosing: string;
    hosts: string[];
  };

  reception: {
    badge: string;
    title: string;
    subtitle: string;
    isoDateTime: string;
    formattedDate: string;
    formattedDay: string;
    formattedTime: string;
    timeZone: string;
    venueName: string;
    venueHall?: string;
    fullAddress: string;
    city: string;
    googleMapsUrl: string;
    calendarDetails: {
      title: string;
      description: string;
      location: string;
    };
  };

  photos: {
    heroPortrait: string;
    moments: Array<{
      id: string;
      url: string;
      caption: string;
      subtitle?: string;
    }>;
  };

  wishes: {
    enabled: boolean;
    recipients: WishRecipient[];
    whatsappNumber: string; // Default / primary fallback number
    defaultRecipientName: string;
    presetMessages: string[];
  };

  audio: {
    enabled: boolean;
    filePath: string;
    trackTitle: string;
    artist?: string;
  };

  guestPersonalization: {
    enabled: boolean;
    fallbackGreeting: string;
    greetingTemplate: (guestName: string) => string;
  };

  metadata: {
    siteTitle: string;
    siteDescription: string;
    ogImage: string;
    themeColor: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      name: "Vineeth",
      fullName: "Vineeth M",
      title: "The Groom",
      familyNote: "S/o Smt. Sobhana S. & Shri Madhavan Nair",
      oneLiner: "Balancing life's ledger with joy, heart & humor",
      portrait: "/images/groom-vineeth.jpg",
      originCity: "Dubai",
    },
    bride: {
      name: "Alida",
      fullName: "Alida",
      title: "The Bride",
      familyNote: "D/o Smt. . & Shri ",
      oneLiner: "Advocating for endless love, laughter & forever",
      portrait: "/images/bride-alida.jpg",
      originCity: "Kerala",
    },
    monogram: "V & A",
    combinedNames: "Vineeth & Alida",
    hashtag: "#VineethWedsAlida",
    originJourney: {
      from: "Dubai",
      to: "Kerala",
      note: "Coming home to celebrate our beginning",
    },
  },

  family: {
    invitationHeadline: "Together with our families",
    invitationMessage:
      "We cordially invite you to join us for an evening of celebration, joyful laughter, and dinner as we celebrate the wedding reception of Vineeth & Alida.",
    warmClosing: "With love, prayers, and heartfelt anticipation",
    hosts: ["The Parents & Family of Vineeth", "The Parents & Family of Alida"],
  },

  reception: {
    badge: "The Wedding Reception",
    title: "Grand Evening Reception",
    subtitle: "A celebratory evening of music, dining, and blessings",
    // Confirmed Reception Date & Time: Thursday, 7 January 2027 at 6:00 PM
    isoDateTime: "2027-01-07T18:00:00+05:30",
    formattedDate: "Thursday, 7 January 2027",
    formattedDay: "Thursday Evening",
    formattedTime: "6:00 PM Onwards",
    timeZone: "Asia/Kolkata",
    venueName: "Mangrove Aquaventures",
    venueHall: "Backwater Lawns & Banquet",
    fullAddress: "Vadakkemukku, Nedungolam, Paravoor, Kerala 691334",
    city: "Paravoor, Kerala",
    // Verified Google Share directions URL
    googleMapsUrl: "https://share.google/lS2sSzxGjm4a2iZhD",
    calendarDetails: {
      title: "Wedding Reception of Vineeth & Alida",
      description:
        "Join Vineeth and Alida for an evening of celebration, dining, and blessings at their wedding reception.",
      location:
        "Mangrove Aquaventures, Vadakkemukku, Nedungolam, Paravoor, Kerala 691334",
    },
  },

  photos: {
    heroPortrait: "/images/hero-couple.jpg",
    moments: [
      {
        id: "moment-1",
        url: "/images/moment-1.jpg",
        caption: "The Journey Begins",
        subtitle: "Two worlds meeting with grace",
      },
      {
        id: "moment-2",
        url: "/images/moment-2.jpg",
        caption: "Evening Lights",
        subtitle: "Laughter in every conversation",
      },
      {
        id: "moment-3",
        url: "/images/moment-3.jpg",
        caption: "Together in Love",
        subtitle: "Counting down to forever",
      },
    ],
  },

  wishes: {
    enabled: true,
    recipients: [
      {
        id: "vineeth",
        name: "Vineeth",
        role: "Groom",
        phone: "919876543210", // Vineeth's WhatsApp Number (editable)
        label: "Vineeth (Groom)",
      },
      {
        id: "alida",
        name: "Alida",
        role: "Bride",
        phone: "919876543211", // Alida's WhatsApp Number (editable)
        label: "Alida (Bride)",
      },
    ],
    whatsappNumber: "919876543210",
    defaultRecipientName: "Vineeth & Alida",
    presetMessages: [
      "Wishing you a lifetime of endless love, joyful laughter, and abundant blessings!",
      "Congratulations Vineeth & Alida! So thrilled to celebrate your special evening with you!",
      "May your new journey together be filled with harmony, prosperity, and happiness!",
      "Heartfelt congratulations! Sending all our prayers and warmest love to both families!",
    ],
  },

  audio: {
    enabled: true,
    filePath: "/audio/wedding-bgm.mp3",
    trackTitle: "Romantic Acoustic Celebration",
    artist: "Wedding Melodies",
  },

  guestPersonalization: {
    enabled: true,
    fallbackGreeting: "Cordially Welcoming You & Your Family",
    greetingTemplate: (guestName: string) => `Cordially Welcoming ${guestName}`,
  },

  metadata: {
    siteTitle: "Vineeth & Alida — Wedding Reception Invitation",
    siteDescription:
      "Together with their families, Vineeth and Alida warmly invite you to celebrate their wedding reception on Thursday, 7 January 2027.",
    ogImage: "/images/og-wedding.jpg",
    themeColor: "#11211A",
  },
};
