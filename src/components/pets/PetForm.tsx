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

interface PetFormProps {
  pet: Pet | null;
  action: (formData: FormData) => void;
}

export default function PetForm({ action, pet }: PetFormProps) {
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  return (
    <div className="flex md:h-screen md:w-screen items-center justify-center bg-cover bg-center bg-accent">
      <Card>
        <CardHeader>
          <CardTitle>Add Pet</CardTitle>
          <CardDescription>
            Enter your pet's name and birth date. You can also upload an
            optional profile image.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action}>
            <div className="grid w-full items-center gap-4">
              {/* Pet Image with Click Handler */}
              <div className="flex justify-center items-center my-4">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="w-32 h-32 rounded-full cursor-pointer"
                >
                  <img
                    src={imageUrl ?? "/default-pet.png"}
                    alt="Pet Image"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input name="name" placeholder="Name" type="text" required />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="birthDate">Birth Date</Label>
                <DateSelector
                  birthDate={birthDate}
                  setBirthDate={setBirthDate}
                />
              </div>

              <input
                type="hidden"
                name="birthDate"
                value={birthDate.toISOString()} // yyyy-mm-dd format
              />

              <Button className="w-full mt-6" type="submit">
                Add
              </Button>
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
          {/* TODO: {message && <p className="text-sm text-destructive">{message}</p>} */}
        </CardFooter>
      </Card>
    </div>
  );
}
