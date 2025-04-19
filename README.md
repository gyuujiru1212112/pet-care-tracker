# 🐾 Pet Care Tracker 🐾

* Team member: Yiduo Jing [1000308142], yiduo.jing@mail.utoronto.ca

### Premise
For the best experience, please use Google Chrome, as some browsers may not fully support Tailwind CSS and shadcn/ui components. I used emojis somewhere, and I assume most system fonts support them.

### Motivation:
As a cat owner and journaling enthusiast, I've struggled to find an app that combines pet care tracking with a personal journaling experience. Most apps focus on health records, lacking a simple way to document pet's daily routines, e.g. grooming, feeding, activities, etc. I want to create a timeline-style journal to easily log pet's routines and milestones while keeping it private and uncomplicated. This project merges my passions for journaling and pet care. The target users are pet owners who enjoy journaling and want a straightforward way to record their pet's daily moments in an organized format.

### Objectives:
This project aims to build a Pet Care Tracker app tailored for cat owners, enabling them to record daily activities and important moments, such as grooming, feeding, and vet visits in a timeline format. Along the way, I aimed to gain hands-on experience with technologies like React, Next.js, Tailwind CSS, shadcn/ui, etc., through practical implementation.
### Technical Stack:
The app was built using the **Next.js Full Stack** framework to ensure responsiveness, with **Tailwind CSS** and **shadcn/ui** powering the user interface. **PostgreSQL** was used as the database, managed through **Prisma ORM** with deployed version hosted on **Supabase**. For file storage, the app integrated **DigitalOcean Spaces**, and **NextAuth** handled user authentication. I primarily used the **sonner toast** to display messages.
### Features:
1. **User Authentication & Authorization:**
   - **Feature:** Secure user login and session management. The middleware ensures that only users with an active session can access the dashboard and pet-related pages. Otherwise, they will be redirected to the login page.
   - **Technical Approach:** I initially planned to use BetterAuth, but ran into persistent issues with session management. Despite seeking help through available resources, including the BetterAuth Discord community, the lack of documentation made troubleshooting difficult. Due to time constraints, I decided to switch to NextAuth. However, this also came with challenges, particularly inconsistencies between the local and production builds (deployed on Vercel). After considerable debugging, I managed to resolve the issue, though I'm still not entirely confident in its stability. Hopefully, it continues to work as expected.

2. **Pet Management (Add/Edit/Delete Pet & Pet Profile):**
   - **Feature:** Users can add multiple pets, each with a profile picture, name, and birthdate.
   - **Technical Approach:** Implemented Next.js Server Actions to handle the creation, editing, and deletion of pet profiles. *(Please refer to the user guide for more details.)*
  
3. **Daily Journey Timeline Log:**
   - **Feature:** Each pet has a vertical timeline where users can add, edit and delete daily logs categorized by tags such as grooming, activities, feeding, and vet visits. A "Load Earlier Dates" button is available to fetch and display more logs. Currently, reloading the page doesn't preserve the loaded logs, but I plan to enhance this by using session storage in the future. *(Please refer to the user guide for more details.)*
   - **Technical Approach:** Designed a Log model in Prisma, associating each log entry with a specific pet and user (with session-based access control). Each log contains a description, date, and tag. The logs are displayed in a timeline format, using Card, Textarea, and Badge components from shadcn/ui, with styling handled by Tailwind CSS.
   - Schema for Log: 
        ```
        model Log {
        id          String   @id @default(uuid())
        description String
        date        DateTime @default(now()) // Date the log was created
        tag         String
        images      String[]
        userId      String
        user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
        petId       String
        pet         Pet      @relation(fields: [petId], references: [id], onDelete: Cascade)
        createdAt   DateTime @default(now())
        updatedAt   DateTime @updatedAt

        @@index([petId, date])
        }
        ```

4. **Pet Switching:**
   - **Feature:** Users can switch between pets to view and add logs for specific pets.
   - **Technical Approach:** Leveraged Next.js dynamic routing to navigate to the selected pet's page using its ID and display the corresponding pet-specific content.

5. **File Handling (Pet Profile Pictures):**
   - **Feature:** Users can upload pet profile pictures.
   - **Technical Approach:** Integrated DigitalOcean Spaces for secure file storage, using its API within the Next.js framework to handle image uploads. This allows users to upload and display images on their pet's profile.

### User Guide:
- Homepage: `baseURL`
- Signup: `baseURL/signup`
  - Successful
  - Unsuccessful
- Login: `baseURL/login`
  - Successful
  - Unsuccessful
- Signout: button on the right side of the headbar
- Home 🏠: button on the left side of the headbar
- Dashboard: `baseURL/dashboard`
- Pet Profile Card
  - Add pet: `baseURL/pets/new`
  - Edit pet:`baseURL/pets/[id]/edit`
  - Pet form
    - File handling - upload profile image in a modal
  - Delete pet:
    - Prompt
- Log screen: `baseURL/pets/[id]/log`



### Development Guide:
#### Deployed Version (Highly Recommended! *Smoother* and *bigger*! :))
Access the live app at https://pet-log-gilt.vercel.app/.
For more details about the platform, refer to the **Deployment** section.
#### Local environment:
- Environment setup and configuration
  - Run `npm install next` if it complains `sh: next: command not found`
- Database initialization
  - The deployed version now uses a Supabase-hosted database. To keep local and production data separate, please use a local PostgreSQL instance when running the app in your local environment.
  - For using a local PostgreSQL server, follow these steps:
    1.	Start the PostgreSQL server on your local machine and create a PostgreSQL database.
	  2.	Set the DATABASE_URL in your .env file to point to your local database as below:
    - **Be sure to include the DIRECT_URL** in your configuration, even though it's intended for the remote database server, it's still required to be explicitly specified.
      ```
      DATABASE_URL="postgresql://[username]:[randompassword]@localhost:[port]/[db_name]?schema=public"
      DIRECT_URL="postgresql://[username]:[randompassword]@localhost:[port]/[db_name]?schema=public"
      ```
	3.	Run `npx prisma generate`
	4.	Run `npx prisma migrate dev --name init` to apply the initial migration and set up the database schema.
- Cloud storage configuration
  Add the following lines to your **.env** file
  ```
  SPACES_KEY=DO801DYY3G28JPBAE49R
  SPACES_SECRET=FFNnBzEGbNFzADs6IulEkOVvvHPJ/Jq85iljzG6i4/M
  SPACES_REGION=nyc3
  SPACES_BUCKET=pet-care-tracker-next-images
  SPACES_ENDPOINT=https://nyc3.digitaloceanspaces.com
  ```
- NextAuth configuration
  Add the following lines to your **.env** or **.env.local** file (I tested both locations and they work, but the official documentation recommends using **.env.local**.)
    ```
    NEXTAUTH_SECRET="6Do2bnYc0vZu9jMxjfgnpDLDiik+IcbLJ980WG26cow="
    NEXTAUTH_URL=http://localhost:3000
    ```
- Local development
  - Development build: Run `npm run dev` (**Only development mode is supported because NextAuth requires a trusted host.**)
  - Open `http://localhost:3000` with your browser to view the homepage.



### Deployment Information (if applicable):
- Live URL: https://pet-log-gilt.vercel.app/
- Platform details: The app is deployed using [Vercel](https://vercel.com/), a cloud platform optimized for front-end frameworks and serverless functions. Vercel automatically builds and deploys the app directly from the connected Git repository. The environment variables used in production are mostly the same as the local setup, with the main difference being the database URL, which points to a Supabase-hosted PostgreSQL instance for the deployed version.
  ```
  # Connect to Supabase via connection pooling
  DATABASE_URL="postgresql://postgres.tedtmmupdskppyxrafoj:PetCareTracker@aws-0-ca-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

  # Direct connection to the database. Used for migrations
  DIRECT_URL="postgresql://postgres.tedtmmupdskppyxrafoj:PetCareTracker@aws-0-ca-central-1.pooler.supabase.com:5432/postgres"
  ```
 
### Individual Contributions:
I completed this project independently. I handled all aspects, including design, development, and testing.
### Lessons Learned and Concluding Remarks:
This project has been beneficial in solidifying my knowledge of Next.js full-stack development, particularly with Server and Client components. However, I still find it challenging to work with client components that involve server actions. Sometimes, I get confused about the distinction between server and client in Next.js, which can be especially frustrating when using NextAuth. Additionally, I haven't made significant contributions to performance optimization. Front-end development, especially when adjusting Tailwind CSS, also remains a tough challenge for me. Moreover, I explored several ways to add a loading effect, but I felt it added too much overhead. Overall, I enjoyed this course and creating this project!