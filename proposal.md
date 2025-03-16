# Pet Care Tracker

* Duration: 4.5 Weeks (development) + 0.5 Week (report + demo + buffer time)
* Team member: Yiduo Jing [1000308142]

## Motivation
As a cat owner and journaling enthusiast, I've struggled to find an app that combines pet care tracking with a personal journaling experience. Most apps focus on health records, lacking a simple way to document pet's daily routines, e.g. grooming, feeding, activities, etc. I want to create a timeline-style journal to easily log pet's routines and milestones while keeping it private and uncomplicated. This project merges my passions for journaling and pet care. The target users are pet owners who enjoy journaling and want a straightforward way to record their pet's daily moments in an organized format.


## Objective and Key Features
The project aims to create a Pet Care Tracker app for cat owners, allowing them to log daily activities and milestones like grooming, feeding, and veterinary visits in a timeline format.

The app will use **Next.js Full Stack** for responsiveness, along with **Tailwind CSS** and **shadcn/ui** for the user interface. **PostgreSQL** will serve as the database with **Prisma ORM**, and **DigitalOcean** will provide cloud storage for file management.

**Core Features:**

1. **User Authentication & Authorization:**
   - **Feature:** Secure user login and account management.
   - **Technical Approach:** Utilize Auth.js.

2. **Pet Management (Add Pet & Pet Profile):**
   - **Feature:** Users can add up to three pets, each with a profile picture, breed, and birth date.
   - **Technical Approach:** Use Next.js API routes to manage pet creation.  Update and deletion will be expanded if time allows.

3. **Daily Journey Timeline Log:**
   - **Feature:** Each pet will have a daily log categorized by tags such as grooming, activities, feeding, and vet visits. *(Please refer to the images attached below. This is the initial draft of the timeline log UI for this proposal, and the final UI design will be different.)*
   - **Technical Approach:** Create a Log model in Prisma linked to each pet. Each log will include a description, date, and tags. The log data will be displayed in a timeline format using components like Card, Textarea, and Badge from shadcn/ui, styled with Tailwind CSS.
  ![Journey Timeline Preview](https://drive.google.com/file/d/1Y69ObrhRTpl3drhfBngL-zdx85O0-1FU/view?usp=sharing)
  ![Journey Timeline Preview when adding logs](https://drive.google.com/file/d/1xnJ_QqYBNXKhD8KTKDWv1K2b-m4P2Uq-/view?usp=sharing)

4. **Pet Switching:**
   - **Feature:** Users can switch between pets to view and add logs for specific pets.
   - **Technical Approach:** Use Next.js session management to store the current pet selection and update the UI accordingly.

5. **File Handling (Pet Profile Pictures and Log Images):**
   - **Feature:** Users can upload pet profile pictures and images for logs.
   - **Technical Approach:** Use DigitalOcean Spaces for secure file storage, integrating the API into Next.js for handling file uploads. Users will be able to upload images, which will be stored and displayed on their pet's profile and log entries.

6. **Filtering by Dates, Tags, or Both (Optional):**  
   - **Feature:** If time allows, provide users with the option to filter logs by date, tags, or both.
   - **Technical Approach:** Utilize shadcn/ui components, such as the Select or Date Picker, to implement this feature. Connect to the server via API routes to retrieve the filtered logs.

7. **Integration with External Services (Optional):**
   - **Feature:** If time permits, allow users to share their daily logs as simple visual cards on Instagram.
   - **Technical Approach:** Integrate a tool for simple image generation or create a simple visual card from scratch, allowing sharing via the Instagram API.

**Database Schema:**
```
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  pets      Pet[]
  logs      Log[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Pet {
  id        Int      @id @default(autoincrement())
  name      String
  breed     String
  birthDate DateTime
  profilePictureUrl String?
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  logs      Log[]
}

model Log {
  id        Int      @id @default(autoincrement())
  description String
  date      DateTime @default(now()) // Date the log was created
  tags      Tag[]
  images    String[]
  petId     Int
  pet       Pet      @relation(fields: [petId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Tag {
    id        Int      @id @default(autoincrement())
    name      String @unique // Grooming, Feeding, etc.
    logs      Log[] // tag related logs
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

This project meets the requirements for **User Authentication and Authorization** and **File Handling and Processing**. It can be completed within a timeline of 4 to 5 weeks and will focus on essential functionalities such as user management, pet management, log creation, and timeline display. Additional features, such as Filtering by tags/dates, Instagram sharing, may be included as optional enhancements depending on the available time. What's more, UI design can be simplified if necessary to ensure the project is completed on time.

## Tentative Plan
The timeline below is generally planned, but it is highly possible to get adjusted.

**Week 1: Setup & User Authentication**
- Set up the Next.js project with Tailwind CSS and shadcn/ui.
- Configure Prisma with essential models (User, Pet, Log, Tag).
- Implement user authentication and authorization using Auth.js.
- Create API routes for user registration, login, logout.
- Set up DigitalOcean Spaces for file storage.
- Create a basic UI layout and navigation.

**Week 2: Pet Management**
- Create API routes for pet creation and develop the "Add Pet" feature, which includes:
  - Profile creation (with picture upload).
  - Capturing breed and birth date.
- Implement the Pet Profile view
- Create a user interface or button for switching between pets.
- *Expand "Edit pet", "Delete Pet" features (if time allows)*.

**Week 3: Daily Log System**
- Implement the Daily Timeline Log UI using shadcn/ui components, including a button for loading earlier logs.
- Implement tag categories (grooming, activities, feeding, vet).
- Build API routes for log creation, editing, and deletion.

**Weeks 4-4.5: File Handling & Optional Features**
- Add image upload support for log entries.
- *Implement filtering by date and tags (if time permits).*
- *Design and build the Instagram-sharing card (if time permits).*
- Conduct thorough testing and fix any bugs.

**Weeks 4.5-5: Final Report, Demo & Polish**
- Polish the UI for an improved user experience.
- Write the final report.
- Record a demo video showcasing the core features.