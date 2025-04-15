import { Pet } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateSelector } from "@/components/DateSelector";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UploadModal from "../UploadModel";
import Link from "next/link";

interface PetFormProps {
  title: string;
  pet: Pet | null;
  action: (formData: FormData) => void;
}

export default function PetForm({ title, action, pet }: PetFormProps) {
  const [birthDate, setBirthDate] = useState<Date>(
    pet?.birthDate ? new Date(pet.birthDate) : new Date()
  );
  const [imageUrl, setImageUrl] = useState<string | null>(
    pet?.profilePictureUrl ?? null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-accent p-4 pt-20">
      <Card className="w-full max-w-2xl md:max-w-3xl shadow-xl p-6 md:p-10">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
          <CardDescription className="text-base md:text-lg">
            Enter your pet's name and birth date. You can also upload an
            optional profile image.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action}>
            <div className="grid w-full items-center gap-6">
              {/* Pet Image with Click Handler */}
              <div className="flex justify-center items-center my-4">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden cursor-pointer shadow-md transition-transform hover:scale-105"
                >
                  <img
                    src={imageUrl ?? "/default-pet.png"}
                    alt="Pet Image"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />

              <div className="flex flex-col space-y-2">
                <Label htmlFor="name" className="text-lg">
                  Name
                </Label>
                <Input
                  name="name"
                  placeholder="Name"
                  type="text"
                  required
                  defaultValue={pet?.name ?? ""}
                  className="text-base px-4 py-3"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="birthDate" className="text-lg">
                  Birth Date
                </Label>
                <DateSelector
                  birthDate={birthDate}
                  setBirthDate={setBirthDate}
                />
              </div>

              <input
                type="hidden"
                name="birthDate"
                value={birthDate.toISOString()}
              />

              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6 w-full">
                <Button className="w-full sm:w-36 py-3 text-base" type="submit">
                  {title === "Add Pet" ? "Add" : "OK"}
                </Button>
                <Link href="/dashboard" className="w-full sm:w-36">
                  <Button variant="outline" className="w-full py-3 text-base">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </form>

          {/* Upload Modal */}
          <UploadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpload={handleImageUpload}
          />
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2">
          {/* Optional message placeholder */}
        </CardFooter>
      </Card>
    </div>
  );
}
