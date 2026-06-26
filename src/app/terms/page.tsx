import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'CGV & Mentions Légales - Raclif',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">
      <Navbar />
      
      <main className="pt-32 pb-16 px-4 max-w-4xl mx-auto flex-grow w-full">
        <h1 className="text-4xl font-bold mb-8 font-outfit">Conditions Générales de Vente</h1>
        
        <div className="prose prose-invert prose-purple max-w-none text-gray-400 bg-[#111118] border border-white/5 p-8 rounded-2xl shadow-xl">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Objet</h2>
            <p>
              Les présentes conditions générales de vente régissent l'utilisation de nos produits digitaux (clés de licence) sur la plateforme Raclif. L'achat de tout produit implique l'acceptation sans réserve de ces conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Livraison</h2>
            <p>
              Nos produits sont numériques. La livraison est effectuée de manière instantanée après validation du paiement par notre prestataire (Stripe). La clé de licence est disponible dans l'espace client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Politique de Remboursement</h2>
            <p>
              Conformément à la législation sur les biens numériques, le droit de rétractation s'applique uniquement si la clé de licence n'a pas été utilisée. Dès l'instant où la clé est activée ou liée à un HWID, aucun remboursement ne sera accordé.
            </p>
          </section>

          <section className="mb-0">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Responsabilité</h2>
            <p>
              Raclif ne peut être tenu responsable des sanctions (bannissements, suspensions) appliquées aux comptes des utilisateurs sur des plateformes tierces. L'utilisation de nos logiciels se fait aux risques et périls de l'utilisateur.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
