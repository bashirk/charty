import { NextApiRequest, NextApiResponse } from 'next';
import { addUserCredits, getUserIdByEmail } from '../../utils/helper';
import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const webhookHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const secret = process.env.PAYSTACK_WEBHOOK_SECRET!;

    const eventSignature = req.headers['x-paystack-signature'];
    // const payload = JSON.stringify(req.body);
    const eventData = JSON.stringify(req.body);

    if (!eventData) {
      console.log('❌ Payload is undefined');
      res.status(400).send('Payload is undefined');
      return;
    }

    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (eventSignature !== hash) {
      console.log('❌ Invalid signature');
      res.status(400).send('Invalid signature');
      return;
    }

    console.log('✅ Webhook received:');
    console.log(eventData)

    const event = req.body.event;
    const data = req.body.data;

    if (event === 'charge.success') {
      const customerCode = data.customer.customer_code;
      console.log(`💵 Payment success for customer code: ${customerCode}`);

      const userEmail = data.customer.email;
      // credit_amount follows SQL naming convention in this case to comply with Supabase Stored Procedures
      let credit_amount = 0;

      // @ts-ignore
      switch (data.amount) {
        //using kobo count
        case 500 * 100:
          credit_amount = 20;
          break;
        case 2000 * 100:
          credit_amount = 100;
          break;
        case 3500 * 100:
          credit_amount = 250;
          break;
        case 8000 * 100:
          credit_amount = 750;
          break;
      }

      const row_id = await getUserIdByEmail(userEmail);
      // Update user_credits in users table after purchase
      // check if payment_reference doesn't already exist data.reference
      await addUserCredits(row_id, credit_amount);

      // const createdAt = new Date().toISOString();
      const createdAt = new Date(data.created_at).toISOString();
      await supabase.from('purchases').insert([
        {
          id: uuidv4(),
          user_id: row_id,
          credit_amount: credit_amount,
          created_at: createdAt,
          status: 'success',
          payment_reference: data.reference,
        },
      ]);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event}`);
    }
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('GET Method Not Allowed');
  }
};

export default webhookHandler;
