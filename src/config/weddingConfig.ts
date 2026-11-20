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
  portrait?: string;
  initial: string;
  originCity: string;
  phone?: string; // Direct WhatsApp number with country code, no + or spaces, e.g. "919876543210"
}

export interface WishRecipient {
  id: string;
  name: string;
  role: string;
  phone: string; // WhatsApp number with country code, no + or spaces, e.g. "919876543210"
  label?: string;
}

export interface PetVipConfig {
  enabled: boolean;
  sectionBadge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
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

  pets: PetVipConfig;

  photos?: {
    heroPortrait?: string;
    moments?: Array<{
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
    siteUrl?: string;
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
      initial: "V",
      originCity: "Dubai",
      phone: "917025987500", // Vineeth's Direct WhatsApp Number
    },
    bride: {
      name: "Alida",
      fullName: "Adv. Alida M Vinod",
      title: "The Bride",
      familyNote: "D/o Smt. Manjusha G . & Shri Vinod Kumar",
      oneLiner: "Advocating for endless love, laughter & forever",
      initial: "A",
      originCity: "Kerala",
      phone: "917510165607", // Alida's Direct WhatsApp Number
    },
    monogram: "A & V",
    combinedNames: "Alida & Vineeth",
    hashtag: "#AlidaWedsVineeth",
    originJourney: {
      from: "Dubai",
      to: "Kerala",
      note: "Coming home to celebrate our beginning",
    },
  },

  family: {
    invitationHeadline: "Together with our families",
    invitationMessage:
      "We cordially invite you to join us for an evening of celebration, joyful laughter, and dinner as we celebrate the wedding reception of Alida & Vineeth.",
    warmClosing: "With love, prayers, and heartfelt anticipation",
    hosts: ["The Parents & Family of Alida", "The Parents & Family of Vineeth"],
  },

  reception: {
    badge: "The Wedding Reception",
    title: "Grand Evening Reception",
    subtitle: "A celebratory evening of music, dining, and blessings",
    // Confirmed Reception Date & Time: Thursday, 7 January 2027 at 5:30 PM
    isoDateTime: "2027-01-07T17:30:00+05:30",
    formattedDate: "Thursday, 7 January 2027",
    formattedDay: "Thursday Evening",
    formattedTime: "5:30 PM Onwards",
    timeZone: "Asia/Kolkata",
    venueName: "Kariyilakallu Lake View",
    venueHall: "Lakeside Pavilion & Backwaters",
    fullAddress: "Nedungolam, Paravoor, Kollam, Kerala 691334",
    city: "Paravoor, Kerala",
    // Verified Google Maps Place & Directions URL
    googleMapsUrl: "https://maps.google.com/?cid=2116222744221680343",
    calendarDetails: {
      title: "Wedding Reception of Alida & Vineeth",
      description:
        "Join Alida and Vineeth for an evening of celebration, dining, and blessings at their wedding reception.",
      location:
        "Kariyilakallu Lake View, Nedungolam, Paravoor, Kerala 691334",
    },
  },

  pets: {
    enabled: true,
    sectionBadge: "🐾 SPECIAL GUESTS",
    title: "And Three Very Special Guests",
    subtitle: "Patiently counting down the days with happy tail wags & boundless love",
    description:
      "An inseparable part of our family story, patiently counting down the days with happy tail wags to celebrate Alida & Vineeth's new chapter together.",
    image: "/images/Vineeth_Alida_Additional_image.jpeg",
    imageAlt: "Alida & Vineeth's beloved family dogs",
  },

  wishes: {
    enabled: true,
    recipients: [
      {
        id: "alida",
        name: "Alida",
        role: "Bride",
        phone: "917510165607", // Alida's Direct WhatsApp Number
        label: "Alida (Bride)",
      },
      {
        id: "vineeth",
        name: "Vineeth",
        role: "Groom",
        phone: "917025987500", // Vineeth's Direct WhatsApp Number
        label: "Vineeth (Groom)",
      },
    ],
    whatsappNumber: "917025987500",
    defaultRecipientName: "Alida & Vineeth",
    presetMessages: [
      "Wishing you a lifetime of endless love, joyful laughter, and abundant blessings!",
      "Congratulations Alida & Vineeth! So thrilled to celebrate your special evening with you!",
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
    siteTitle: "Alida & Vineeth — Wedding Reception Invitation",
    siteDescription:
      "Together with their families, Alida and Vineeth warmly invite you to celebrate their wedding reception on Thursday, 7 January 2027.",
    siteUrl: "https://vineeth-alida.vercel.app/",
    ogImage: "/og-image-sapphire.jpg",
    themeColor: "#0B1325",
  },
};
