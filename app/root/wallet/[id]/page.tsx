import Transaction from "@/components/form/transaction";
import Wallet from "@/components/form/wallet";

export default function Page({ params }: { params: { id: string } }) {
    const walletid = params.id;
    
    return (

      <main className="h-screen w-screen flex ">
        <div className="transaction  flex w-3/4 m-auto">
        <Wallet walletid={walletid} />
            <Transaction from={walletid} />
        </div>
        
      </main>

  );
}
