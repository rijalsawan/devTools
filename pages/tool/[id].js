import { useRouter } from "next/router";

export default function ToolPage() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Tool ID: {id}</h1>
            <p>This page dynamically displays the tool with ID {id}.</p>
        </div>
    );
}
