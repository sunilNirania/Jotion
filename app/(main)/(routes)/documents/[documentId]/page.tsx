"use client"

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Divide } from "lucide-react";
import { Toolbar } from "@/components/toolbar";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">
    };
};

const DocumentIdPage = ({
    params
}:DocumentIdPageProps) => {

    const document = useQuery(api.documents.getById,{
        documentId: params.documentId
    });

    if(document === undefined){
        return (<div>
            <h1>DocumentIdPage</h1>
            <div>Loading...</div>
        </div>)
    }

    if(document === null){
        return (
            <div>
                Not Found
            </div>
        )
    }


    return (
        <div className="pb-40">
            <div className="h-[35vh]"/>
            <div className="md:max-w-3xl lg:max-2-4xl mx-auto">
                <Toolbar initialData={document}/>
            </div>
        </div>
    )
}

export default DocumentIdPage;