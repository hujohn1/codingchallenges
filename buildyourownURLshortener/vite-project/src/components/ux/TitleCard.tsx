import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import type React from "react"

interface TitleCardProps{
    longURL: string;
    onValueChange: (newURL:string)=>void;
    shouldShorten: boolean;
    onShouldShortenChange: ()=>void;
}

export function TitleCard(props: TitleCardProps){
    const {longURL, onValueChange, shouldShorten, onShouldShortenChange} = props

    const handleLongURLChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        onValueChange(event.target.value)
    }
    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        onShouldShortenChange()
    }
    const shorturl  =""
    
    return (
        <>
        <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>TinyURL Clone</CardTitle>
            <CardDescription>Shorten a long URL in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">LongURL</Label>
                    <Input id="longURL" placeholder="Enter long URL here" onChange={handleLongURLChange}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">ShortURL</Label>
                    <Input id="shortURL" placeholder="" readOnly value={shorturl}/>
                    </div>
                </div>
                    <div className="flex justify-between mt-4">
                        <Button className="bg-emerald-700 text-white" variant="outline" type="submit">Shorten</Button>
                        <Button
                            onClick={() =>
                                toast("Copied to clipboard", {
                                description: "Sunday, December 03, 2023 at 9:00 AM",
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                                })
                            }
                        >
                        Copy
                        </Button>
                    </div>
            </form>
        </CardContent>
        
        </Card>
        <Toaster position="bottom-right" richColors /> 
        </>
    )
}