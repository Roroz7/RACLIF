import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'FAQ - Raclif',
};

const faqs = [
  {
    question: "Combien de temps faut-il pour recevoir ma clé après achat ?",
    answer: "La livraison est instantanée. Dès que votre paiement est confirmé par Stripe, vous recevrez votre clé de licence directement sur votre dashboard et par email."
  },
  {
    question: "Dois-je lier mon compte Discord pour acheter ?",
    answer: "Oui, la liaison Discord est obligatoire. Elle nous permet de sécuriser votre achat, de vous attribuer automatiquement le rôle client sur notre serveur et de faciliter le support technique."
  },
  {
    question: "Que signifie le statut 'Undetected' ?",
    answer: "Cela signifie que nos développeurs ont testé le produit récemment et qu'aucun ban n'a été recensé. Cependant, l'utilisation de logiciels tiers comporte toujours une part de risque."
  },
  {
    question: "Proposez-vous des remboursements ?",
    answer: "Les remboursements sont accordés uniquement si la clé n'a pas été utilisée. Une fois la clé liée à votre machine (HWID), aucun remboursement n'est possible. Pour plus de détails, consultez nos CGV."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">
      <Navbar />
      
      <main className="pt-32 pb-16 px-4 max-w-3xl mx-auto flex-grow w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
              <HelpCircle className="text-primary" size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-outfit">Questions Fréquentes</h1>
          <p className="text-gray-400 text-lg">
            Retrouvez les réponses aux questions les plus posées par notre communauté.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-xl">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-medium hover:text-primary transition-colors">
                <span className="text-lg">{faq.question}</span>
                <span className="transition group-open:rotate-180 text-gray-500">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-gray-400 border-t border-white/5 mt-2 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
