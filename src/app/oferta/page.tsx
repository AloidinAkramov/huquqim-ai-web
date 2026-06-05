import { ArrowLeft, Scale } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Ommaviy oferta — Huquqim.AI",
  description: "Huquqim.AI platformasidan foydalanish bo'yicha ommaviy oferta (publik shartnoma).",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="space-y-2 text-[14px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function OfertaPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="grid size-9 place-items-center rounded-lg bg-brand-600 text-white">
            <Scale className="size-5" />
          </div>
          <span className="font-bold tracking-tight">
            Huquqim<span className="text-brand-600">.AI</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-all hover:-translate-x-0.5 hover:text-brand-600"
        >
          <ArrowLeft className="size-4" /> Orqaga
        </Link>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            Ommaviy oferta (publik shartnoma)
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            Huquqim.AI platformasidan foydalanish bo&apos;yicha ommaviy oferta shartnomasi
          </h1>
        </div>

        <div className="mt-8 space-y-7">
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            Ushbu hujjat O&apos;zbekiston Respublikasi Fuqarolik kodeksining 367-, 369- va
            370-moddalariga muvofiq ommaviy oferta (publik shartnoma taklifi) hisoblanadi va
            Huquqim.AI platformasi orqali xizmatlardan foydalanish shartlarini belgilaydi. Ushbu
            Oferta shartlarini to&apos;liq va so&apos;zsiz qabul qilish (aksept) — Foydalanuvchining
            platformada ro&apos;yxatdan o&apos;tishi, hisob yaratishi yoki platformaning istalgan
            xizmatidan foydalanishi hisoblanadi. Aksept lahzasidan boshlab shartnoma tuzilgan deb
            hisoblanadi.
          </p>

          <Section title="1. Atamalar va ta'riflar">
            <p>
              <b>Ijrochi</b> — Huquqim.AI platformasining egasi va operatori. <b>Platforma</b> —
              huquqim.ai manzilidagi dasturiy-apparat majmuasi, AI-xizmatlar bilan.{" "}
              <b>Foydalanuvchi</b> — ushbu Oferta shartlarini qabul qilgan jismoniy yoki yuridik
              shaxs. <b>AI-xizmatlar</b> — sun&apos;iy intellekt yordamida yuridik ma&apos;lumot va
              hujjat loyihalarini tayyorlash xizmatlari. <b>Tarif</b> — xizmatlar to&apos;plamining
              narxi va shartlari.
            </p>
          </Section>

          <Section title="2. Shartnoma predmeti">
            <p>
              Ijrochi Foydalanuvchiga: (a) AI-asosidagi avtomatlashtirilgan yuridik axborot va hujjat
              loyihalarini tayyorlash; (b) malakali yuristlar bilan bog&apos;lash xizmatlarini taqdim
              etadi. Xizmatlar aralash model asosida: bepul, obuna (oylik/yillik) hamda bir martalik
              to&apos;lov. Aniq tarkib va narx platformadagi Tariflar bilan belgilanadi.
            </p>
          </Section>

          <Section title="3. Mas'uliyat cheklovi (muhim ogohlantirish)">
            <p className="font-medium text-foreground">
              Biz nima qilamiz: Huquqim.AI — sun&apos;iy intellektga asoslangan huquqiy yordamchi.
              Biz huquqiy holatni umumiy tarzda tushuntiramiz, qonun moddalari haqida ma&apos;lumot
              beramiz va hujjat namunalarini tayyorlashda yordam beramiz.
            </p>
            <p>
              <b>Biz nima QILMAYMIZ:</b> Biz advokat yoki yurist emasmiz va rasmiy huquqiy maslahat
              bermaymiz. Javoblarimiz sud qarorini yoki ish natijasini kafolatlamaydi. Sizning
              o&apos;rningizga yakuniy qaror qabul qilmaymiz — faqat variantlarni ko&apos;rsatamiz.
            </p>
            <p>
              <b>Bizning tavsiyamiz:</b> Murakkab yoki jiddiy holatlarda (jinoiy ishlar, sud nizolari,
              katta moliyaviy masalalar) malakali advokat yoki yurist bilan gaplashishni qat&apos;iy
              tavsiya qilamiz. Faqat litsenziyalangan mutaxassis ishni to&apos;liq baholay oladi.
            </p>
            <p>
              <b>Ma&apos;lumotning aniqligi:</b> Biz O&apos;zbekiston qonunchiligiga asoslanamiz, ammo
              qonunlar o&apos;zgarishi mumkin. Muhim qaror oldidan ma&apos;lumotni rasmiy manbalardan
              (lex.uz) yoki yuristdan tekshiring.
            </p>
          </Section>

          <Section title="4. AI-xizmatlarning alohida shartlari">
            <p>
              AI-xizmatlar avtomatlashtirilgan axborot xizmatlari bo&apos;lib, professional yuridik
              maslahat o&apos;rnini bosmaydi va advokatlik faoliyati hisoblanmaydi. AI natijalari
              faqat axborot maqsadida taqdim etiladi; Foydalanuvchi ularni mustaqil tekshirishi
              tavsiya etiladi. Ijrochi AI natijalarining mutlaq aniqligi uchun javobgar emas —
              Foydalanuvchi barcha xavf-xatarni o&apos;z zimmasiga oladi. AI-xizmatlardan qonunga zid
              yoki firibgarlik maqsadida foydalanish taqiqlanadi.
            </p>
          </Section>

          <Section title="5. Yurist xizmatlarining alohida shartlari">
            <p>
              Platforma Foydalanuvchini yuristlar bilan bog&apos;lovchi axborot vositachisi sifatida
              xizmat ko&apos;rsatadi. Yuridik xizmatlar bevosita tegishli yurist tomonidan
              ko&apos;rsatiladi; xizmat sifati uchun ijro etuvchi yurist javobgar. Platforma
              vositachilik (komission) haqi olishi mumkin.
            </p>
          </Section>

          <Section title="6. To'lov tartibi">
            <p>
              Pullik xizmatlar narxi Tariflarga muvofiq O&apos;zbekiston so&apos;mida belgilanadi.
              To&apos;lov oldindan (prepaid) amalga oshiriladi. Obuna avtomatik uzaytirilishi mumkin;
              Foydalanuvchi uni istalgan vaqtda bekor qilishi mumkin. Iste&apos;molchi-jismoniy
              shaxslar &laquo;Iste&apos;molchilar huquqlarini himoya qilish to&apos;g&apos;risida&raquo;gi
              qonun bilan kafolatlangan huquqlarga ega.
            </p>
          </Section>

          <Section title="7. Tomonlarning huquq va majburiyatlari">
            <p>
              Ijrochi platforma ishlashini ta&apos;minlaydi va ma&apos;lumotlarni qonun talablariga
              muvofiq himoya qiladi. Foydalanuvchi to&apos;g&apos;ri ma&apos;lumot taqdim etishi, hisob
              xavfsizligini ta&apos;minlashi va xizmatlardan qonunchilikka muvofiq foydalanishi shart.
              Platformaga noqonuniy kirish yoki zarar yetkazish taqiqlanadi.
            </p>
          </Section>

          <Section title="8. Intellektual mulk">
            <p>
              Platforma, uning dasturiy ta&apos;minoti, dizayni, logotipi va kontenti Ijrochiga
              tegishli intellektual mulk hisoblanadi. Foydalanuvchiga cheklangan, eksklyuziv
              bo&apos;lmagan litsenziya beriladi.
            </p>
          </Section>

          <Section title="9. Shaxsiy ma'lumotlar">
            <p>
              Foydalanuvchi aksept orqali shaxsiy ma&apos;lumotlarini &laquo;Shaxsga doir
              ma&apos;lumotlar to&apos;g&apos;risida&raquo;gi qonun hamda Maxfiylik siyosatiga muvofiq
              qayta ishlashga rozilik beradi. Ma&apos;lumotlar O&apos;zbekiston Respublikasi
              hududidagi serverlarda saqlanadi.
            </p>
          </Section>

          <Section title="10. Javobgarlik">
            <p>
              Tomonlar amaldagi qonunchilikka muvofiq javobgar. Ijrochining javobgarligi oxirgi 3
              (uch) oy ichida to&apos;langan xizmat haqi summasi bilan cheklanadi. Ijrochi bilvosita
              zararlar yoki AI/uchinchi shaxs yuristlari natijalaridan kelib chiqqan oqibatlar uchun
              javobgar emas.
            </p>
          </Section>

          <Section title="11–14. Fors-major, o'zgartirish, nizolar, yakuniy qoidalar">
            <p>
              Tomonlar yengib bo&apos;lmas kuch holatlari uchun javobgar emas. Ijrochi Oferta
              shartlarini bir tomonlama o&apos;zgartirishi mumkin. Nizolar muzokaralar yo&apos;li bilan,
              kelishilmasa O&apos;zbekiston Respublikasi sudida hal qilinadi. Ushbu shartnomaga
              O&apos;zbekiston Respublikasi qonunchiligi qo&apos;llaniladi. Oferta uch tilda (o&apos;zbek,
              rus, ingliz) tuzilgan; tafovut bo&apos;lganda o&apos;zbek tilidagi matn ustuvor.
            </p>
          </Section>
        </div>

        <div className="mt-10 rounded-[18px] border border-border bg-surface p-5 text-center shadow-card">
          <p className="text-sm text-muted-foreground">
            Ro&apos;yxatdan o&apos;tish orqali siz ushbu ommaviy ofertani to&apos;liq qabul qilgan
            hisoblanasiz.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-card-hover"
          >
            Ro&apos;yxatdan o&apos;tishga qaytish
          </Link>
        </div>
      </main>
    </div>
  );
}
