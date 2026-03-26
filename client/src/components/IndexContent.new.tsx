export function IndexContent({ onProjectClick }: { onProjectClick?: (sectionId: string, projectId?: string) => void }) {
  // Helper: extract a displayable thumbnail URL from a media item
  function getMediaThumb(item: { type: string; url: string; [key: string]: any }): { src: string; isVideo: boolean; aspectRatio?: string } {
    if (item.type === 'image') return { src: item.url, isVideo: false, aspectRatio: item.aspectRatio };
    if (item.type === 'mp4' || item.type === 'video') return { src: '', isVideo: true };
    if (item.type === 'vimeo') {
      const m = item.url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (m) return { src: `https://vumbnail.com/${m[1]}.jpg`, isVideo: true, aspectRatio: item.aspectRatio };
      return { src: '', isVideo: true };
    }
    if (item.type === 'youtube') {
      const m = item.url.match(/embed\/([^?]+)/);
      if (m) return { src: `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`, isVideo: true };
      return { src: '', isVideo: true };
    }
    return { src: item.url, isVideo: false };
  }

  // Inline lightbox state
  const [lightbox, setLightbox] = React.useState<{ item: any; sectionId: string } | null>(null);
  // Expanded info panels per project
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  // All project data with descriptions
  const allSections: Array<{
    label: string;
    sectionId: string;
    projects: Array<{
      id: string;
      title: string;
      tagline?: string;
      description?: string;
      agency?: string;
      linkHref?: string;
      hoverImg?: string;
      media: Array<{ type: string; url: string; [key: string]: any }>;
    }>;
  }> = [
    {
      label: 'SOCIAL AND PR',
      sectionId: 'social',
      projects: [
        {
          id: 'social-01',
          title: '@ZUCK',
          tagline: '',
          description: '',
          agency: '',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/download(8)_c34ba657.jpeg',
          media: [
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/download(8)_c34ba657.jpeg' },
          ]
        },
        {
          id: 'social-02',
          title: 'FACEBOOK (I WANNA ROCK)',
          tagline: "WHATEVER YOU ROCK, THERE'S A FACEBOOK GROUP FOR YOU",
          description: "This campaign seeks to show the diversity of Facebook Groups through the lens of Rock. Whether you like to paint on rocks, collect rock crystals or rock out with 80's rock stars — there's a Facebook group for you.",
          agency: 'Agency: Meta Creative X',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-525ea5da065d(1)_4b841a17.gif',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/435655934', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/435655396', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/435655053', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/435654761', aspectRatio: '4/5' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mood-2000x1251_5c73fc1f.jpg' },
          ]
        },
        {
          id: 'social-03',
          title: 'FACEBOOK (HOUSE OF HORRORS)',
          tagline: 'HALLOWEEN TIPS FROM HALLOWEEN EXPERTS',
          description: 'With Halloween being one of the biggest and busiest moments on the platform, the community is always eager for tips and tricks. So we thought who better to give Halloween advice and inspiration, than Facebook "Halloween" Groups?\n\nWe brought together Halloween themed Groups, and under one roof, to share their tips, tricks and insights from the Wonderful House of Horrors.',
          agency: 'Agency: Meta Creative X',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/ezgif-80d9ca958b65d964_9784c73e.gif',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/371704647', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/371744962', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/371704689', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/371704672', aspectRatio: '4/5' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/jjh-copy-1-2000x2501_2b1bad90.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/fb_halloween_hauntedhouse_interior_v1_001-1535x1920(1)_d20c9b0a.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/jjh-2000x2501(1)_c3875392.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_dining_food-1920x1500_e9071cea.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_dining_table_set-1920x1500_5bea1b1c.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_lab_vials-1920x1500_a7cd8d42.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_lab_tank_cabinet-1920x1500_1919cd0c.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_attic_stairs_detail-1920x1500_cca3aae6.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_attic_lights-1920x1500_c7724193.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_study_mgk_sheet01-1920x1500(1)_c06ad717.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_study_sheet04_astronomyroom-1920x1500_f37680c4.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_all_windows-1920x1500(1)_80ef703e.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mouth_mask1-1-2000x1125(1)_bcaa547f.jpg' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/371745605', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/371745632', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/371745670', aspectRatio: '4/5' },
          ]
        },
        {
          id: 'facebook-mindfull',
          title: 'FACEBOOK (MINDFULL)',
          tagline: 'FIND YOUR CALM AND FOCUS',
          description: 'The arrival of COVID19 has created a heightened amount of fear, stress and anxiety for everyone. Increasingly, people are looking to their community for help and support as we continue to weather this storm together. In response, we felt it was important to create a content series about well-being and mental health to help our community get through the pressures of being inside and at home.',
          agency: 'Agency: Meta Creative X',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-9da134f664ea(1)_bb4e7901.gif',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/429384060', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/432946376', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/429384778', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/432946669', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/432945889', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/429385150', aspectRatio: '4/5' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/432948234', aspectRatio: '4/5' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/everything-2000x1235_b21af245.png' },
          ]
        },
      ]
    },
    {
      label: 'CAMPAIGN',
      sectionId: 'campaign',
      projects: [
        {
          id: 'facebook-eoy',
          title: '(01) FACEBOOK [END OF YEAR]',
          tagline: 'A YEAR TO REMEMBER, AND A YEAR TO FORGET',
          description: 'At the end of 2020, we created a film that showed how we will never forget the ways people showed up for each other and their communities throughout the year, helping us find comfort in discomfort and strength in one another.',
          agency: 'In-House Agency: Meta Creative X',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-525ea5da065d(1)_4b841a17.gif',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/491893629' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-525ea5da065d(1)_4b841a17.gif' },
          ]
        },
        {
          id: 'libero-football',
          title: '(02) LÍBERO [FOOTBALL ANALOGIES]',
          tagline: 'A CAMPAIGN WHERE WOMEN EXPLAIN TO MEN EVERY DAY SITUATIONS THROUGH FOOTBALL ANALOGIES',
          description: '"If they explain it to you with football, you get it" is the concept created by the agency to put across the message that Líbero is not just a football magazine, but also one that uses the world\'s most popular sport to talk about other topics such as culture, art and style, among others.',
          agency: 'Agency: Lola Madrid',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/libero_thumb_f8a1c3b2.jpg',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/110569579' },
          ]
        },
        {
          id: 'levis-vote',
          title: "(03) LEVI'S [USE YOUR VOTE]",
          tagline: 'VOTING LOOKS GOOD ON EVERYONE',
          description: "We mashed up what feels like a National Geographic documentary with a music video to remind Americans that voting isn't just a chore, but a powerful form of self-expression.\n\nBut we didn't just make a film. We also turned stores into registration centers, made custom clothes, got employers to give employees time off to vote, and a whole bunch more—all to actually make a difference and get people to express themselves on election day.",
          agency: 'Agency: FCB West',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/OXxlRjSxBBPnCmFq.webp',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/365098825' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/OXxlRjSxBBPnCmFq.webp' },
          ]
        },
        {
          id: 'samsung-unbox',
          title: '(04) SAMSUNG [UNBOX YOUR PHONE]',
          tagline: 'S8 LAUNCH CAMPAIGN',
          description: "The new Galaxy S8 has the world's first Infinity Screen – an expansive display that stretches all the way to the edges of the device and makes everything feel more immersive.\n\nTo capture this feeling, the launch campaign features a series of tranquil nature scenes that begin within the confines of a traditional phone screen, but then break free from these barriers",
          agency: 'Agency: R/GA NY',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/samsung_s8_thumb.jpg',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/212568146' },
          ]
        },
        {
          id: 'wwf-just',
          title: '(05) WWF [JUST*]',
          tagline: 'WHAT YOU NEED, NATURALLY',
          description: 'just* is a WWF initiative created to show that there are often simple and natural alternatives to many of the products we use every day - products that require packaging that uses up resources and often end up as landfill.\n\nA few simple steps are all it takes to make small changes that, when done by many, can help create a cleaner and more sustainable future.',
          agency: 'Agency: Leo Burnett Sydney',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CFPgqAIsIykasLty.jpg',
          media: [
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/just01-1-2000x786_e1b2c3d4.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CFPgqAIsIykasLty.jpg' },
          ]
        },
        {
          id: 'facebook-real-story',
          title: '(06) FACEBOOK [REAL STORY]',
          tagline: 'REAL STORIES. TOLD AUTHENTICALLY',
          description: 'From the seemingly small, to the powerfully poignant, everyone has a Facebook Story. As we uncovered them, we found stories of life, stories of healing, stories of love, and stories of progress. But always stories centered around community and how others help you go further.',
          agency: 'Agency: Meta Creative X',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/fb_real_story_thumb.jpg',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/435655934' },
          ]
        },
      ]
    },
    {
      label: 'BRAND AND IDENTITY',
      sectionId: 'brand',
      projects: [
        {
          id: 'wwf-just-brand',
          title: '(01) WWF [JUST*]',
          tagline: 'PACKAGING DESIGNED TO ELIMINATE PACKAGING',
          description: "Everyday we buy millions of household products that are essentially chemicals in plastic bottles. And every one of them puts more pressure on our already fragile environment.\n\nSo we got rid of the plastic and the chemicals by creating a range of natural, alternative products for WWF called just*. Each was 100% natural and packaged using recyclable and biodegradable materials.",
          agency: 'Agency: Leo Burnett Sydney',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CFPgqAIsIykasLty.jpg',
          media: [
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CFPgqAIsIykasLty.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/poster02-2000x3143_f670d0fc.jpg' },
          ]
        },
        {
          id: 'studio-mano',
          title: '(02) STUDIO MANO',
          tagline: 'STUDIO MANO DESIGN IDENTITY',
          description: 'HANDMADE OBJECTS, HANDMADE IDENTITY.\n\nDesign identity for Studio Mano, my own personal pottery and furniture project. The idea was to reflect the process behind the work. Since the pieces are handmade, the design is also built by hand, using illustrations, stamps, letters, and scanned textures.',
          agency: '',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/studio_mano_thumb.jpg',
          media: [
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/studio_mano_thumb.jpg' },
          ]
        },
        {
          id: 'facebook-rebrand',
          title: '(03) FACEBOOK [REBRAND]',
          tagline: 'ILLUSTRATION DIRECTION AND TONE OF VOICE',
          description: "Marketing consultant for Facebook's rebrand, co-leading illustration direction and ensuring a consistent tone of voice, look, and feel across product, brand, and marketing.",
          agency: '',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/fb_rebrand_thumb.jpg',
          media: [
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/fb_rebrand_thumb.jpg' },
          ]
        },
        {
          id: 'bundaberg-rum',
          title: '(04) BUNDABERG RUM [BLENDING KIT]',
          tagline: 'PACKAGING AS THE EXPERIENCE',
          description: "As a premium offering created for Bundaberg Rum connoisseurs, every element of the limited edition Blending Kit was designed to reflect the craft that goes into making Australia's most famous rum, from the wood of the barrels through to the copper of the stills.",
          agency: 'Leo Burnett Sydney',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/bundaberg_thumb.jpg',
          media: [
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/bundaberg_thumb.jpg' },
          ]
        },
      ]
    },
    {
      label: 'EVENTS AND ACTIVATIONS',
      sectionId: 'events',
      projects: [
        {
          id: 'meta-connect-2025',
          title: '(01) META CONNECT [2025]',
          tagline: "META'S BIGGEST ANNUAL MIXED REALITY & AI EVENT",
          description: "Meta Connect is the company's biggest and most important event, where Mark Zuckerberg takes the stage to share the latest products, vision, and what's coming next.\n\nOnce again, I led the creative direction for the event, overseeing a full team of creative directors, artists, designers, and partners across product, comms, and marketing. I managed simultaneously multiple workstreams, making sure everything stayed aligned and worked together as one clear, cohesive story. From concept to script to production, my role was to keep the whole thing tight, simple, and engaging while turning complex ideas into something people could actually get.",
          agency: '',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/connect2025_thumb.jpg',
          media: [
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/connect2025_thumb.jpg' },
          ]
        },
        {
          id: 'meta-connect-2024',
          title: '(02) META CONNECT [2024]',
          tagline: "META'S BIGGEST ANNUAL MIXED REALITY & AI EVENT",
          description: "Meta Connect is Meta's biggest annual event where the company shares the latest developments in mixed reality, AI and wearables.",
          agency: '',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/connect2024_thumb.jpg',
          media: [
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/connect2024_thumb.jpg' },
          ]
        },
        {
          id: 'mr-lee',
          title: "(03) MR. LEE'S TAILOR SHOP",
          tagline: 'TAILOR SHOP TO SUPERHEROES AND VILLAINS',
          description: "In the new Playstation game, DC Universe Online, you can create your own superhero or villain by choosing powers, abilities and your custom suit.\n\nMr. Lee's Tailor Shop specializes in handcrafting custom suits for heroes and villains. So you can make your suit a reality and can live the same experience as the game in the offline world.\n\nThe live experience began deciding whether to be a hero or villain, fill out a questionnaire, and get measurements taken. The custom suit was first created within the game and then an illustrator drew a sketch and gave it to the client together with an estimate.",
          agency: 'Agency: Leo Burnett Iberia',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mrlee_thumb.jpg',
          media: [
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mrlee_thumb.jpg' },
          ]
        },
      ]
    },
    {
      label: 'INTERACTIVE',
      sectionId: 'interactive',
      projects: [
        {
          id: 'samsung-diplo',
          title: "SAMSUNG X DIPLO [CAN'T STOP]",
          tagline: "THE MIX THAT ONLY PLAYS WHEN YOU MOVE",
          description: "Introducing \"Can't Stop\" by Grammy-winning DJ/Producer Diplo, an exclusive 30-minute mix with a catch: you have to move to play it. Your phone's GPS and accelerometer detect movement to play the mix, which is composed of new, unreleased content. Run, jump, dance, pogo - the app doesn't discriminate. Just don't stop.",
          agency: '',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/xXvnNMChIHQzGOdH.gif',
          media: [
            { type: 'video', url: 'https://vimeo.com/217188315' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/uGdlSKPSGtBQrFuE.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FaGpapXCNhQUaRcm.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/xXvnNMChIHQzGOdH.gif' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CPXWQSYjyWAXGKdw.gif' },
          ]
        },
        {
          id: 'mcdonalds-emlings',
          title: "McDONALD'S [EMLINGS]",
          tagline: "HELPING McDONALD'S FIND ITS MISSING MAGIC",
          description: "Emlings is a digital toy that brings the Happy Meal to life, reinvigorating the brand for a new generation.",
          agency: '',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BmylwDPzFqnMlzuH.gif',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/334615998?badge=0&autopause=0&player_id=0&app_id=58479' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/oVYCfdUVvdIIWyny.png' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/yzspyztZdyAMXtUk.png' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BmylwDPzFqnMlzuH.gif' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/iHHNQmahOnbwGonZ.gif' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/UWdVTsqwqOIcdarH.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/eNuJomcvUcIPIuJx.gif' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ZlHYGShdCcShGHIU.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/TNZWkPVBhCIAWaPU.gif' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ARIgZOhyWOqEOluJ.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/QCjxNORjawpCXsbI.gif' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pzGXxSviSBJQYmzC.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/SeyKZQNIxVxyJiPq.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/DTYsCwDNViReJDFZ.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/kPMNzsnBlFMmQzAL.jpg' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/zcfVhFNQhvYMxnla.jpg' },
          ]
        },
        {
          id: 'samsung-s-drive',
          title: 'SAMSUNG [S-DRIVE]',
          tagline: 'REWARDING SAFE DRIVING',
          description: 'Samsung S-Drive was created to turn one of the biggest distractions on the road into a life saver.',
          agency: '',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/49424455075641.5d4132e539b75_4c6ca02e.gif',
          media: [
            { type: 'vimeo', url: 'https://player.vimeo.com/video/343710550' },
            { type: 'vimeo', url: 'https://player.vimeo.com/video/219596551' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/49424455075641.5d4132e539b75_4c6ca02e.gif' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/36c4d655075641.5d4135ab84f41_5dd89a8f.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/2d5f0255075641.5d4132e58d3c0_ae3590eb.jpeg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/aaaaaa-2(1)_b2083aae.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/s-02-2000x1519-1(1)_c9c5863c.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/posters_3d5cb432.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/s1(1)_d6038a28.gif' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/S-Drive-Design-Case-Study1(1)_b5a95fcf.gif' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/vS-Drive-Design-Case-Study_3020c507.jpg' },
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-b8629a5cef27_02f09d4c.gif' },
          ]
        },
        {
          id: 'mood-calendar',
          title: 'MOOD CALENDAR',
          tagline: 'TRACK YOUR EMOTIONS VISUALLY',
          description: 'A vibe-coding experiment that visualizes your daily mood patterns through generative art.',
          agency: '',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BohndpCczayUhLRz.webp',
          media: [
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BohndpCczayUhLRz.webp' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/eTLpEhXQdCMMsErK.png' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/gehppVuuZNgkbJhJ.png' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/YYedkQnLKbLlcwVh.png' },
          ]
        },
        {
          id: 'love-meter',
          title: 'LOVE-O-METER',
          tagline: 'HOW MUCH DOES BRUNO LOVE JOCELYN?',
          description: 'A vibe-coded love meter that answers the most important question.',
          agency: '',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FqZUEkFKBDsqgrMJ.gif',
          media: [
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FqZUEkFKBDsqgrMJ.gif' },
          ]
        },
        {
          id: 'poster-3d',
          title: 'POSTER.3D',
          tagline: 'TURN ANY IMAGE INTO A 3D ROTATING ANIMATION',
          description: 'Browser-based tool that takes any static image (JPEG, PNG, or WebP) and instantly transforms it into a 3D rotating animation — rendered in real-time using WebGL (Three.js). No server, no upload to any cloud, no account needed. Everything runs entirely in your browser.',
          agency: '',
          linkHref: 'https://poster3d-cseabzsj.manus.space/',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pAQzwsyJJllvdawh.gif',
          media: [
            { type: 'mp4', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/TbXMAtuGNhKslUEa.mov' },
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pAQzwsyJJllvdawh.gif' },
          ]
        },
        {
          id: 'whoopee-cushion',
          title: 'THE WHOOPINATOR',
          tagline: 'DIGITAL PRANKS REIMAGINED',
          description: 'A playful web experiment bringing classic pranks into the digital age.',
          agency: '',
          hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pZAmffwXWzvtAGVp.gif',
          media: [
            { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pZAmffwXWzvtAGVp.gif' },
          ]
        },
        {
          id: 'instagram-unlocker',
          title: 'LEARN TO UNLOCK',
          tagline: 'EARN YOUR SCREEN TIME',
          description: 'Answer trivia questions to unlock Instagram for 10 minutes. A quiz-gated social media timer.',
          agency: '',
          hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/Screenshot2026-03-12at8.53.47PM_a3120d72.webp',
          media: [
            { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/Screenshot2026-03-12at8.53.47PM_a3120d72.webp' },
          ]
        },
      ]
    },
  ];

  const THUMB_MAX_H = 220;

  // Inline lightbox overlay
  const renderLightbox = () => {
    if (!lightbox) return null;
    const { item } = lightbox;
    const isVimeo = item.type === 'vimeo';
    const isMp4 = item.type === 'mp4' || item.type === 'video';
    const isImage = item.type === 'image';
    return (
      <div
        onClick={() => setLightbox(null)}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'zoom-out',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}
        >
          {isVimeo && (
            <iframe
              src={item.url}
              style={{ width: '80vw', height: item.aspectRatio === '4/5' ? 'calc(80vw * 1.25)' : '45vw', maxHeight: '85vh', border: 'none', display: 'block' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
          {isMp4 && (
            <video
              src={item.url}
              controls
              autoPlay
              style={{ maxWidth: '80vw', maxHeight: '85vh', display: 'block' }}
            />
          )}
          {isImage && (
            <img
              src={item.url}
              alt=""
              style={{ maxWidth: '80vw', maxHeight: '85vh', display: 'block', objectFit: 'contain' }}
            />
          )}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '-32px', right: 0,
              background: 'none', border: 'none', color: '#fff',
              fontSize: '22px', cursor: 'pointer', fontFamily: 'Arial Narrow, Arial, sans-serif',
            }}
          >✕ CLOSE</button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 overflow-y-auto h-full" style={{ background: '#000000', color: '#ffffff' }}>
      {renderLightbox()}
      {allSections.map((section) => (
        <div key={section.label} className="mb-10">
          {/* Section header */}
          <h2 style={{
            fontFamily: 'Arial Narrow, Arial, sans-serif',
            fontSize: '13px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '16px',
            color: '#ffffff',
            letterSpacing: '0.05em',
            borderBottom: '1px solid #333',
            paddingBottom: '6px',
          }}>
            {section.label}
          </h2>

          {/* Projects */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {section.projects.map((project) => {
              const isExpanded = !!expanded[project.id];
              return (
                <div key={project.id}>
                  {/* Project title row */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: isExpanded ? '0' : '8px' }}>
                    <div
                      style={{
                        fontFamily: 'Arial Narrow, Arial, sans-serif',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {project.title}
                    </div>
                    {/* [EXPAND] toggle */}
                    {(project.description || project.tagline || project.agency) && (
                      <button
                        onClick={() => setExpanded(prev => ({ ...prev, [project.id]: !prev[project.id] }))}
                        style={{
                          background: 'none', border: 'none', padding: 0,
                          fontFamily: 'Arial Narrow, Arial, sans-serif',
                          fontSize: '10px',
                          color: '#888',
                          cursor: 'pointer',
                          letterSpacing: '0.05em',
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px',
                          flexShrink: 0,
                        }}
                      >
                        {isExpanded ? '[COLLAPSE]' : '[EXPAND]'}
                      </button>
                    )}
                    {/* External link for vibe-coding projects */}
                    {project.linkHref && (
                      <a
                        href={project.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'Arial Narrow, Arial, sans-serif',
                          fontSize: '10px',
                          color: '#888',
                          letterSpacing: '0.05em',
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px',
                        }}
                      >
                        [OPEN ↗]
                      </a>
                    )}
                  </div>

                  {/* Expanded info panel */}
                  {isExpanded && (
                    <div style={{
                      margin: '10px 0 12px 0',
                      padding: '12px 14px',
                      borderLeft: '1px solid #333',
                      background: '#0a0a0a',
                    }}>
                      {project.tagline && (
                        <div style={{
                          fontFamily: 'Arial Narrow, Arial, sans-serif',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: '#aaa',
                          letterSpacing: '0.08em',
                          marginBottom: '8px',
                        }}>{project.tagline}</div>
                      )}
                      {project.description && (
                        <div style={{
                          fontFamily: 'Arial Narrow, Arial, sans-serif',
                          fontSize: '12px',
                          color: '#ccc',
                          lineHeight: '1.6',
                          whiteSpace: 'pre-line',
                          marginBottom: project.agency ? '8px' : '0',
                        }}>{project.description}</div>
                      )}
                      {project.agency && (
                        <div style={{
                          fontFamily: 'Arial Narrow, Arial, sans-serif',
                          fontSize: '10px',
                          color: '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>{project.agency}</div>
                      )}
                    </div>
                  )}

                  {/* Horizontal scrolling media strip */}
                  <div style={{
                    display: 'flex',
                    gap: '6px',
                    overflowX: 'auto',
                    paddingBottom: '4px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#444 transparent',
                    alignItems: 'flex-start',
                  }}>
                    {project.media.map((item, idx) => {
                      const { src, isVideo, aspectRatio } = getMediaThumb(item);
                      const isImage = item.type === 'image';
                      const is45 = aspectRatio === '4/5' || item.aspectRatio === '4/5';
                      // For 4:5 videos, show portrait thumbnail
                      const thumbW = is45 ? Math.round(THUMB_MAX_H * 0.8) : undefined;

                      return (
                        <div
                          key={idx}
                          onClick={() => setLightbox({ item, sectionId: section.sectionId })}
                          style={{
                            position: 'relative',
                            flexShrink: 0,
                            background: '#111',
                            overflow: 'hidden',
                            cursor: 'zoom-in',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            ...(is45 ? { width: `${thumbW}px`, height: `${THUMB_MAX_H}px` } : {}),
                          }}
                        >
                          {isImage ? (
                            <img
                              src={item.url}
                              alt=""
                              style={{
                                maxHeight: `${THUMB_MAX_H}px`,
                                width: 'auto',
                                display: 'block',
                                objectFit: 'contain',
                              }}
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                            />
                          ) : src ? (
                            <>
                              <img
                                src={src}
                                alt=""
                                style={{
                                  maxHeight: `${THUMB_MAX_H}px`,
                                  width: is45 ? '100%' : 'auto',
                                  height: is45 ? '100%' : 'auto',
                                  display: 'block',
                                  objectFit: is45 ? 'cover' : 'contain',
                                }}
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                              />
                              {/* Play icon overlay */}
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(0,0,0,0.25)',
                              }}>
                                <div style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  background: 'rgba(255,255,255,0.85)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                                    <path d="M1 1L9 6L1 11V1Z" fill="#000" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          ) : (
                            /* mp4 / mov with no thumbnail */
                            <div style={{
                              width: `${Math.round(THUMB_MAX_H * 16 / 9)}px`,
                              height: `${THUMB_MAX_H}px`,
                              background: '#1a1a1a',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                                  <path d="M1 1L9 6L1 11V1Z" fill="#fff" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
