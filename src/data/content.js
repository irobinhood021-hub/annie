// Centralized content & assets for Annie's 19th Birthday Website

export const BIRTHDAY_DATA = {
  name: "Annie",
  fullName: "Annie",
  nickname: "Annie",
  aliases: ["Annie"],
  targetAge: 19,
  previousAge: 18,
  // Countdown target date: 23 November 2026
  targetDate: new Date('2026-11-23T00:00:00'),

  hero: {
    title: "Happy Birthday Annie",
    subtitle: "Wishing you a day filled with love, laughter, and all the happiness your heart can hold. May your 19th year bring you endless joy, bright adventures, and unforgettable memories. Happy Birthday!",
    tagline: "TO ANNIE • TURNING 19 TODAY"
  },

  // 20 Photos for the curved looping photo ribbon (Super-fast lightweight WebP thumbnails + full-res modal)
  ribbonPhotos: [
    { id: 1, url: "/photos/photo-1-thumb.webp", src: "/photos/photo-1-thumb.webp", fullUrl: "/photos/photo-1.webp", caption: "Sweet Smile ✨" },
    { id: 2, url: "/photos/photo-2-thumb.webp", src: "/photos/photo-2-thumb.webp", fullUrl: "/photos/photo-2.webp", caption: "Golden Hour Glow ☀️" },
    { id: 3, url: "/photos/photo-3-thumb.webp", src: "/photos/photo-3-thumb.webp", fullUrl: "/photos/photo-3.webp", caption: "Pure Elegance 🌸" },
    { id: 4, url: "/photos/photo-4-thumb.webp", src: "/photos/photo-4-thumb.webp", fullUrl: "/photos/photo-4.webp", caption: "Candid Joy 💕" },
    { id: 5, url: "/photos/photo-5-thumb.webp", src: "/photos/photo-5-thumb.webp", fullUrl: "/photos/photo-5.webp", caption: "Little Moments ☕" },
    { id: 6, url: "/photos/photo-6-thumb.webp", src: "/photos/photo-6-thumb.webp", fullUrl: "/photos/photo-6.webp", caption: "Forever Muse 🌙" },
    { id: 7, url: "/photos/photo-7-thumb.webp", src: "/photos/photo-7-thumb.webp", fullUrl: "/photos/photo-7.webp", caption: "Stargazer 💫" },
    { id: 8, url: "/photos/photo-8-thumb.webp", src: "/photos/photo-8-thumb.webp", fullUrl: "/photos/photo-8.webp", caption: "In Full Bloom 🌷" },
    { id: 9, url: "/photos/photo-9-thumb.webp", src: "/photos/photo-9-thumb.webp", fullUrl: "/photos/photo-9.webp", caption: "Unfiltered Laughs 💖" },
    { id: 10, url: "/photos/photo-10-thumb.webp", src: "/photos/photo-10-thumb.webp", fullUrl: "/photos/photo-10.webp", caption: "Sunny Days 🌻" },
    { id: 11, url: "/photos/photo-11-thumb.webp", src: "/photos/photo-11-thumb.webp", fullUrl: "/photos/photo-11.webp", caption: "Dreaming Awake ✨" },
    { id: 12, url: "/photos/photo-12-thumb.webp", src: "/photos/photo-12-thumb.webp", fullUrl: "/photos/photo-12.webp", caption: "Soft Light 📸" },
    { id: 13, url: "/photos/photo-13-thumb.webp", src: "/photos/photo-13-thumb.webp", fullUrl: "/photos/photo-13.webp", caption: "Cozy Vibes 🕊️" },
    { id: 14, url: "/photos/photo-14-thumb.webp", src: "/photos/photo-14-thumb.webp", fullUrl: "/photos/photo-14.webp", caption: "Sunset Whispers 🌅" },
    { id: 15, url: "/photos/photo-15-thumb.webp", src: "/photos/photo-15-thumb.webp", fullUrl: "/photos/photo-15.webp", caption: "Always Beautiful 🫶" },
    { id: 16, url: "/photos/photo-16-thumb.webp", src: "/photos/photo-16-thumb.webp", fullUrl: "/photos/photo-16.webp", caption: "Annie's Glow 💌" },
    { id: 17, url: "/photos/photo-17-thumb.webp", src: "/photos/photo-17-thumb.webp", fullUrl: "/photos/photo-17.webp", caption: "That Cute Smile 🥰" },
    { id: 18, url: "/photos/photo-18-thumb.webp", src: "/photos/photo-18-thumb.webp", fullUrl: "/photos/photo-18.webp", caption: "Endless Charm 🤍" },
    { id: 19, url: "/photos/photo-19-thumb.webp", src: "/photos/photo-19-thumb.webp", fullUrl: "/photos/photo-19.webp", caption: "Grace & Kindness 🌿" },
    { id: 20, url: "/photos/photo-20-thumb.webp", src: "/photos/photo-20-thumb.webp", fullUrl: "/photos/photo-20.webp", caption: "Happy 19th Birthday Annie! 🎂" },
  ],

  // Scrapbook Draggable Polaroids & Secret Butterfly Notes (Optimized WebP)
  scrapbook: {
    title: '"Happy Birthday, Annie!"',
    polaroids: [
      {
        id: "p1",
        label: "Cutie 💖",
        title: "Cutie 💖",
        image: "/photos/photo-21.webp",
        rotation: -5,
        slot: "far-left",
        note: {
          title: "To My Favorite Smile ✨",
          text: "Looks like you're really good at catching butterflies... no wonder you caught my heart so effortlessly! Every moment with you feels like a page right out of a fairy tale. Happy 19th Birthday Annie! 🦋"
        }
      },
      {
        id: "p2",
        label: "Baddie 🔥",
        title: "Baddie 🔥",
        image: "/photos/photo-22.webp",
        rotation: -2,
        slot: "mid-left",
        note: {
          title: "Unstoppable Energy 💫",
          text: "Confidence looks incredible on you, Annie! You light up every room you walk into, and watching you chase your dreams inspires me every single day. Keep shining your fierce light!"
        }
      },
      {
        id: "p3",
        label: "My Life 🫶",
        title: "My Life 🫶",
        image: "/photos/photo-23.webp",
        rotation: 0,
        slot: "center",
        note: {
          title: "My Whole World 🌸",
          text: "They say home is a place, but for me, home is whenever I'm talking to you. You make ordinary days feel like once-in-a-lifetime celebrations. Happy 19th Birthday, Annie!"
        }
      },
      {
        id: "p4",
        label: "Dream Girl ✨",
        title: "Dream Girl ✨",
        image: "/photos/photo-24.webp",
        rotation: 3,
        slot: "mid-right-bottom",
        note: {
          title: "Pure Magic 🌙",
          text: "If I had a flower for every time you made me smile, I could walk through an endless garden. Thank you for simply existing and being the most wonderful soul, Annie!"
        }
      },
      {
        id: "p5",
        label: "Bestie 🥰",
        title: "Bestie 🥰",
        image: "/photos/photo-25.webp",
        rotation: 8,
        slot: "top-right",
        note: {
          title: "Golden Hour Glow ☀️",
          text: "You radiate so much warmth and beauty wherever you go. Life is so much brighter, happier, and sweeter with you in it!"
        }
      },
      {
        id: "p6",
        label: "Always You ❤️",
        title: "Always You ❤️",
        image: "/photos/photo-26.webp",
        rotation: -4,
        slot: "far-right-bottom",
        note: {
          title: "Forever & Always 💌",
          text: "No matter how many birthdays pass, one thing will never change: I will always be right here, cheering for you, loving you, and celebrating every single thing that makes you Annie."
        }
      }
    ],
    stickers: [
      {
        text: "Love you more than words can hold. Happy 19th Birthday Annie! 🎂",
        pos: "right-top"
      },
      {
        text: "To our gorgeous Annie, forever shining bright! ❤️✨",
        pos: "left-bottom"
      }
    ]
  },

  // VOGUE Magazine Special Edition Spreads (Optimized WebP)
  magazine: {
    totalSpreads: 4,
    spreads: [
      {
        pageLeft: {
          tag: "ISSUE NO. 19 • SPECIAL EDITION",
          headline: "VOGUE",
          subheadline: "BIRTHDAY SPECIAL EDITION",
          ornament: "✦ THE ART OF CELEBRATION ✦",
          title: "ANNIE",
          description: "Celebrating the most extraordinary muse on her 19th milestone. A portrait of elegance, grace, kindness, and eternal sunshine that illuminates every single day.",
          quote: "“Some people bring out the worst in you, others bring out the best, and then there are rare people like Annie who bring out the most magical.”"
        },
        pageRight: {
          title: "Who's that girl?",
          images: [
            "/photos/photo-27.webp",
            "/photos/photo-28.webp",
            "/photos/photo-29.webp",
            "/photos/photo-30.webp",
            "/photos/photo-31.webp",
            "/photos/photo-32.webp"
          ],
          note: "Happy 19th Birthday Annie! 💕"
        }
      },
      {
        pageLeft: {
          tag: "TABLE OF CONTENTS",
          headline: "MEMOIRS",
          subheadline: "CHAPTER 19",
          ornament: "✦ CHRONICLES OF GRACE ✦",
          title: "WHY YOU OWN MY HEART",
          description: "1. The sound of your real, unfiltered laugh\n2. How deeply and sincerely you care for people\n3. The way your eyes sparkle when you're excited\n4. Your calm presence in a chaotic world\n5. Simply being you, Annie — my favorite blessing.",
          quote: "“You don't just exist, you make the world a gentler place.”"
        },
        pageRight: {
          title: "Golden Hour Reverie",
          images: [
            "/photos/photo-33.webp",
            "/photos/photo-34.webp",
            "/photos/photo-35.webp",
            "/photos/photo-36.webp"
          ],
          note: "Forever in your frame ✨"
        }
      },
      {
        pageLeft: {
          tag: "SOUNDTRACK OF US",
          headline: "PLAYLIST",
          subheadline: "VOGUE MUSIC EDIT",
          ornament: "✦ MELODIES ON REPEAT ✦",
          title: "FAVOURITE SONGS",
          description: "Tracks that feel like warm coffee on a rainy morning, long drives under pastel skies, and every memory spent laughing with you.",
          quote: "“If songs had souls, this playlist would whisper your name.”"
        },
        pageRight: {
          title: "Now Playing: 'Happy Birthday Tune'",
          images: [
            "/photos/photo-37.webp",
            "/photos/photo-1.webp",
            "/photos/photo-2.webp",
            "/photos/photo-3.webp"
          ],
          note: "Track 01 • Infinite Repeat 🎶"
        }
      },
      {
        pageLeft: {
          tag: "A BIRTHDAY LETTER",
          headline: "FOREVER",
          subheadline: "SPECIAL DEDICATION",
          ornament: "✦ THE FINAL WISH ✦",
          title: "DEAR ANNIE",
          description: "May your 19th year be as breathtaking as a sunset over the ocean. May all your dreams find wings and take flight. You deserve every ounce of happiness in this universe, Annie.",
          quote: "“Happy 19th Birthday to our favorite girl in the entire world, Annie!”"
        },
        pageRight: {
          title: "Forever Love",
          images: [
            "/photos/photo-4.webp",
            "/photos/photo-5.webp",
            "/photos/photo-6.webp",
            "/photos/photo-7.webp"
          ],
          note: "Signed with all my love ❤️"
        }
      }
    ]
  }
};
