"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { AboutPageInfo } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Divider } from "antd";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  coverImageUrl: z.string().min(1),
  boxImageUrl: z.string().min(1),
  boxTitle: z.string().min(1),
  boxDescription: z.string().min(1),
  panjara1Description: z.string().min(1),
  freqAskedQuestionsTitle: z.string().min(1),
  freqAskedQuestionsDescription: z.string().min(1),
  freqAskedQuestions2Title: z.string().min(1),
  freqAskedQuestions2Description: z.string().min(1),
  freqAskedQuestions3Title: z.string().min(1),
  freqAskedQuestions3Description: z.string().min(1),
  freqAskedQuestions4Title: z.string().min(1),
  freqAskedQuestions4Description: z.string().min(1),
  whatWeOfferTitle: z.string().min(1),
  whatWeOfferDescription: z.string().min(1),
  whatWeOffer2Title: z.string().min(1),
  whatWeOffer2Description: z.string().min(1),
  whatWeOffer3Title: z.string().min(1),
  whatWeOffer3Description: z.string().min(1),
  whatWeOfferToCourierTitle: z.string().min(1),
  whatWeOfferToCourierDescription: z.string().min(1),






});

// This BlogPostFormValues is for the formik form values type definition.
type BlogPostFormValues = z.infer<typeof formSchema>;

interface BlogPostFormProps {
  initialData: AboutPageInfo | null;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "ჩეცვალე ჩვენს შესახებ" : "შექმენი ჩვენს შესახებ";
  const description = initialData ? "შეცვალე ჩვენს შესახებ" : "დაამატე ახალი ჩვენს შესახებ";
  const toastMessage = initialData ? "ჩვენს შესხებ შეცვლილია" : "ჩვენს შესახებ შეიქმნა წარმატებით";
  const action = initialData ? "შენახვა" : "შექმნა";

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      coverImageUrl: "",
      boxImageUrl: "",
      boxTitle: "",
      boxDescription: "",
      panjara1Description: "",
      freqAskedQuestionsTitle: "",
      freqAskedQuestionsDescription: "",
      freqAskedQuestions2Title: "",
      freqAskedQuestions2Description: "",
      freqAskedQuestions3Title: "",
      freqAskedQuestions3Description: "",
      freqAskedQuestions4Title: "",
      freqAskedQuestions4Description: "",
      whatWeOfferTitle: "",
      whatWeOfferDescription: "",
      whatWeOffer2Title: "",
      whatWeOffer2Description: "",
      whatWeOffer3Title: "",
      whatWeOffer3Description: "",
      whatWeOfferToCourierTitle: "",
      whatWeOfferToCourierDescription: "",
    },
  });


  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/aboutinfo/${params?.aboutId}`, data);
      } else {
        await axios.post(`/api/aboutinfo`, data);
      }
      router.refresh();
      router.push(`/addaboutinfo`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/aboutinfo/${params?.aboutId}`);
      router.refresh();
      router.push(`/addaboutinfo`);
      toast.success("Blog post deleted.");
    } catch (error) {
      toast.error("Error deleting the blog post.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      {/* // formik form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="coverImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-center items-center font-semibold "> Cover - ფოტოს ატვირთვა ჩვენს შესახებ გვერდზე.</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="boxImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-center items-center font-semibold "> ჩვენს შესახებ ბლოკის ფოტო</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Divider orientation="left"> ჩვენს შესახებ  -  სათაური / ინფორმაციის ბლოკი</Divider>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">სათაური (ჩვენს შესახებ და ა.შ)</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="ჩვენს შესახებს სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Add the excerpt field to the form */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ჩვენს შესახებ სათაურის შემდეგ ინფორმაცია (აბზაცი)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="აბზაცი"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="panjara1Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ჩვენს შესახებ სათაურის შემდეგ ინფორმაცია (აბზაცი 2) </FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="აბზაცი"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Divider orientation="left">პირველი ბლოკი (სტანდარტული ფოტო/სათაური/აღწერა)</Divider>

          <FormField
            control={form.control}
            name="boxTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold"> პირველი ბლოკის სათაური (1 ბლოკი - სადაც ფოტო და აღწერა გვჭირდება) </FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="პირველი ბლოკის სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="boxDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">პირველი ბლოკის აღწერა (ინფორმაცია (აბზაცი) 1 ბლოკის სათაურის შემდეგ)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="პირველი ბლოკის აღწერა"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Divider orientation="left">ხშირად დასმული კითხვების სექცია (4 კითხვა პასუხი)</Divider>

          <FormField
            control={form.control}
            name="freqAskedQuestionsTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">(ხშირად დასმული კითხვები) - პირველი ბლოკი (სათაური)</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="freqAskedQuestionsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ხშირად დასმული კითხვები პირველი ბლოკი (ინფორმაცია)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="აბზაცი"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="freqAskedQuestions2Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ხშირად დასმული კითხვები მეორე ბლოკი (სათაური)</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="freqAskedQuestions2Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ხშირად დასმული კითხვები მეორე ბლოკი (ინფორმაცია)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="ინფორმაცია"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="freqAskedQuestions3Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ხშირად დასმული კითხვები მესამე ბლოკი (სათაური)</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder=" სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="freqAskedQuestions3Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ხშირად დასმული კითხვები მესამე ბლოკი (ინფორმაცია)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="ინფორმაცია"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="freqAskedQuestions4Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ხშირად დასმული კითხვები მეოთხე ბლოკი (სათაური)</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="freqAskedQuestions4Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ხშირად დასმული კითხვები მეოთხე ბლოკი (ინფორმაცია)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="ინფორმაცია"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Divider orientation="left">სექცია 3 - ფოტოების გვერდით ჩვენს შესახებ ინფორმაცია</Divider>

          <FormField
            control={form.control}
            name="whatWeOfferTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">სექცია 3 სათაური -( რას ვთავაზობთ მომხმარებლებს? რატომ ჩვენ? და ა.შ) </FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="სექცია 3 - სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="whatWeOfferDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">სექცია 3 - (ინფორმაცია) - (პირველი აბზაცი)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="ინფორმაცია"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="whatWeOffer2Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">სექცია 3 - (აბზაცი 2)</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="აბზაცი 2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="whatWeOffer2Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">სექცია 3 - (აბზაცი 3)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="აბზაცი 3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="whatWeOffer3Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">სექცია 4 - (აბზაცი 4)</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="აბზაცი 4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="whatWeOffer3Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">სექცია 3 - (აბზაცი 5)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="აბზაცი 5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Divider orientation="left">კურიერის სექცია</Divider>
          <FormField
            control={form.control}
            name="whatWeOfferToCourierTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">კურიერის სექცია (სათაური)</FormLabel>
                <FormControl>
                  <Input
                    className="border-green-800"
                    disabled={loading}
                    placeholder="სათაური"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="whatWeOfferToCourierDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">კურიერის სექცია (ინფორმაცია)</FormLabel>
                <FormControl>
                  <Input
                    className="border-purple-500 h-[100px]"
                    disabled={loading}
                    placeholder="ინფორმაცია"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />


          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
